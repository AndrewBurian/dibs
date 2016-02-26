/*
	The DIBS main server process
*/
package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Hello, DIBS!")

	// setup static content handler
	http.Handle("/", http.FileServer(http.Dir("static/")))

	// run the server
	err := http.ListenAndServe(":9000", nil)
	if err != nil {
		panic(err)
	}
}
