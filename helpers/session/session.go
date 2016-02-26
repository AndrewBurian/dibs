package session

import (
	"encoding/json"
	"fmt"
	"github.com/andrewburian/crypter"
	"net/http"
	"time"
)

func getSession(r *http.Request, crypt *crypter.Crypter) (session map[string]string) {

	session = make(map[string]string)

	// get the cookie from header
	cookie, err := r.Cookie("sess")
	if err != nil {
		fmt.Println("No sess cookie found")
		return
	}

	// decrypt cookie contents
	sessString, err := crypt.DecryptDecode(cookie.Value)
	if err != nil {
		return
	}

	// unmarshal session
	err = json.Unmarshal(sessString, &session)
	if err != nil {
		return make(map[string]string)
	}

	return session
}

func setSession(w http.ResponseWriter, crypt *crypter.Crypter, session map[string]string) {

	// check empty
	if len(session) == 0 {
		return
	}

	// marshal to JSON
	sessString, err := json.Marshal(session)
	if err != nil {
		panic(err)
	}

	// encrypt contents
	value, err := crypt.EncryptEncode(sessString)
	if err != nil {
		panic(err)
	}

	// add to hreader
	var cookie http.Cookie
	cookie.Name = "sess"
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.Secure = false   // TODO TLS
	cookie.HttpOnly = false // TODO check if JS can read if true
	cookie.Value = value

	w.Header().Set("Set-Cookie", cookie.String())
}
