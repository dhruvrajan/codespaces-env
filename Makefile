run_backend:
	cd fastapi-app && make run 

run_angular:
	cd angular-app && make run

run: run_backend run_angular