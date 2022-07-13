_EXTERNAL_BUILD=build.external
_EXTERNAL_GO_PB=server/go-pb
_WEB_BUILD=build.web
_WEB_JS_PB=src/web-pb

clean-go-external:
	@rm -rf \
		$(_EXTERNAL_BUILD) \
		$(_EXTERNAL_GO_PB)

gen-go-external:
	@buf generate -v \
		--path proto/ \
		--debug \
		--template buf/buf.gen.yaml
	@mv $(_EXTERNAL_BUILD)/proto $(_EXTERNAL_GO_PB)/
	@rmdir $(_EXTERNAL_BUILD)

regen-go-external: clean-go-external gen-go-external

clean-web:
	@rm -rf \
		$(_WEB_BUILD) \
		$(_WEB_JS_PB)

gen-web:
	@mkdir -p $(_WEB_BUILD)
	@protoc \
		--proto_path=. \
		$(shell find proto/ -iname "*.proto") \
    	--js_out=import_style=commonjs:$(_WEB_BUILD) \
    	--grpc-web_out=import_style=commonjs,mode=grpcwebtext:$(_WEB_BUILD)
	@mv $(_WEB_BUILD)/proto $(_WEB_JS_PB)/
	@rmdir $(_WEB_BUILD)
regen-web: clean-web gen-web

regen-all: regen-go-external regen-web

#
# Go, server side
#
run:
	go run server/main.go

build:
	docker build --platform linux/amd64 -t hjcian/emoji:latest .
	docker push hjcian/emoji:latest

container:
	docker run -p 9000:9000 hjcian/emoji

#
# JS, client side
#

pack-and-serve:
	npx webpack --mode production -o dist/
	serve dist/