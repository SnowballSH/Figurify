package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func Bubble(w http.ResponseWriter, r *http.Request) {
	start := time.Now()

	switch r.Method {
	case http.MethodPost:
		if err := r.ParseForm(); err != nil {
			http.Error(w, "Invalid POST data (No form)", http.StatusBadRequest)
			return
		}

		type item struct {
			Value int
			Key   int
		}

		var requestedArray []*item

		var resp struct {
			Array []int
		}

		d := json.NewDecoder(r.Body)

		err := d.Decode(&resp)

		if err != nil {
			http.Error(w, "Invalid POST data (Invalid array)\n"+err.Error(), http.StatusBadRequest)
			return
		}

		for i, x := range resp.Array {
			requestedArray = append(requestedArray, &item{
				Value: x,
				Key:   i,
			})
		}

		swapped := true

		var result [][]*item
		length := len(requestedArray)

		k := make([]*item, length)
		copy(k, requestedArray)
		result = append(result, k)

		for swapped {
			swapped = false
			for i := 1; i < len(requestedArray); i++ {
				if requestedArray[i-1].Value > requestedArray[i].Value {
					requestedArray[i-1], requestedArray[i] = requestedArray[i], requestedArray[i-1]
					k := make([]*item, length)
					copy(k, requestedArray)
					result = append(result, k)
					swapped = true
				}
			}
		}

		//fmt.Println(result)

		marshalled, e := json.Marshal(result)
		if e != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		_, _ = w.Write(marshalled)

	default:
		http.Error(w, "Cannot "+r.Method, http.StatusMethodNotAllowed)
		return
	}

	duration := time.Since(start)

	fmt.Println(duration)
}
