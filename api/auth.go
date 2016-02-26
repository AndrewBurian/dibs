package api

import (
	"net/http"
//	"fmt"
	"io"
)

type Auth struct {

}

func NewAuth() *Auth {
	return &Auth{}
}

func (a *Auth) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	if req.Method != "POST" {
		res.WriteHeader(400)
		return
	}

	res.WriteHeader(200)

	io.WriteString(res, "Welcome Commander")
}

