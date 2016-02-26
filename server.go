/*
	The DIBS main server process
*/
package main

import (
	"log"
	"net/http"
	"./api"
)

func main() {

	listenAddr := ":9000"

	// setup static content handler
	http.Handle("/", http.FileServer(http.Dir("static/")))

	authHandler := api.NewAuth()
	http.Handle("/auth", authHandler)

	// run the server
	log.Println("Starting server on " + listenAddr)
	err := http.ListenAndServe(listenAddr, nil)
	if err != nil {
		panic(err)
	}
}
