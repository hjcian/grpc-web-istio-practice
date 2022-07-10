# gRPC-web, Golang backend and Istio setup

*NOTE: `kc` is my alias for `kubectl`*

## Prepare proto files
- see the [proto/](./proto/), then execute `make regen-all` to populate pb files (Go and JS)

## Prepare backend
- see [server/](./server/)
- use `make build` to build and publish docker image (or you can just pull the image `hjcian/emoji`)

## Prepare `minikube`
- execute [`minikube start`](https://minikube.sigs.k8s.io/docs/start/)

## Deploy backend and test it
- `kc apply -f k8s/minimum_deployment.yaml`
- `kc port-forward service/backend 9000:9000`
- test it using `go-client`:
  ```bash
  $ go run go-client/main.go -p 9000
  2022/07/09 21:40:01 server says: I like 🍕  and 🍣 !
  ```

## Install Istio into minukube
- https://istio.io/latest/docs/setup/getting-started/#download
```bash
cd ~/projects/istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-1.14.1/
./bin/istioctl install
```

## Deploy istio configurations
- `kc apply -f k8s/istio.yaml`

## Enable 80 and 443 tunnel to check the traffic routing
- start a new terminal and execute `minikube tunnel`:
  ```bash
  $ minikube tunnel
  ✅  Tunnel successfully started

  📌  NOTE: Please do not close this terminal as this process must stay alive for the tunnel to be accessible ...

  ❗  The service/ingress istio-ingressgateway requires privileged ports to be exposed: [80 443]
  🔑  sudo permission will be asked for it.
  🏃  Starting tunnel for service istio-ingressgateway.
  Password: *****
  ```
- then test the backend at another terminal by assigned target port:80
  ```bash
  $ go run go-client/main.go -p 80
  2022/07/09 21:53:16 server says: I like 🍕  and 🍣 !
  ```

## Pack and serve client
- execute `make pack-and-serve`
  ```bash
  $ make pack-and-serve
  npx webpack client/client.js -o client/bundle.js
  Hash: 90c016cca444da250b35
  Version: webpack 4.46.0
  Time: 558ms
  Built at: 2022/07/09 下午10:15:44
      Asset     Size  Chunks                    Chunk Names
  bundle.js  290 KiB       0  [emitted]  [big]  main
  Entrypoint main [big] = bundle.js
  [0] (webpack)/buildin/global.js 472 bytes {0} [built]
  [1] ./client/web-pb/emoji_pb.js 9.29 KiB {0} [built]
  [2] ./client/client.js 757 bytes {0} [built]
  [8] ./client/web-pb/emoji_grpc_web_pb.js 2.86 KiB {0} [built]
      + 6 hidden modules

  WARNING in configuration
  The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
  You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

  WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
  This can impact web performance.
  Assets:
    bundle.js (290 KiB)

  WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
  Entrypoints:
    main (290 KiB)
        bundle.js


  WARNING in webpack performance recommendations:
  You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
  For more info visit https://webpack.js.org/guides/code-splitting/
  serve client/
  UPDATE AVAILABLE The latest version of `serve` is 13.0.4

    ┌─────────────────────────────────────────────────┐
    │                                                 │
    │   Serving!                                      │
    │                                                 │
    │   - Local:            http://localhost:3000     │
    │   - On Your Network:  http://25.52.87.82:3000   │
    │                                                 │
    │   Copied local address to clipboard!            │
    │                                                 │
    └─────────────────────────────────────────────────┘
  ```
- go to http://localhost:3000/

## Type text and press Enter!
![picture 1](https://i.imgur.com/xYnNrGA.png)
![picture 2](https://i.imgur.com/gdx37cy.png)


## References
- https://venilnoronha.io/seamless-cloud-native-apps-with-grpc-web-and-istio
  - NOTE: istio configuration (`EnvoyFilter`) described in article is outdated, but other concepts and explanations are still useful
- https://jackieli.dev/posts/grpc-web-istio/
  - NOTE: up-to-date `EnvoyFilter` configuration
- https://github.com/mmitou/grpc-web-demo/blob/master/docs/en/README.md
  - this demo show that only use [protocol selection](https://istio.io/latest/docs/ops/configuration/traffic-management/protocol-selection/) by assigning `grpc-web` is enough to configure the backend server receives the grpc-web requests
