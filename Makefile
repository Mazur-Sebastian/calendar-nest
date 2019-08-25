dev-dockerfile = -f docker-compose.yml -f docker-compose.dev.yml
prod-dockerfile := -f docker-compose.yml

build-dev:
	docker-compose $(dev-dockerfile) build

dev:
	docker-compose $(dev-dockerfile) up

build-prod:
	docker-compose $(prod-dockerfile) build
	$(MAKE) prod

prod:
	docker-compose $(prod-dockerfile) up -d

# generate-migrations:
# 	docker exec -it backend-service-skystatus yarn run migration:generate