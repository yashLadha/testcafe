FROM alpine:edge

COPY docker/testcafe-docker.sh /opt/testcafe/docker/testcafe-docker.sh

ENV ALPINE_REPOS="\
 --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/\
 --repository http://dl-cdn.alpinelinux.org/alpine/edge/community/\
 --repository http://dl-cdn.alpinelinux.org/alpine/edge/main/\
 --repository http://dl-cdn.alpinelinux.org/alpine/v3.11/community/\
 --repository http://dl-cdn.alpinelinux.org/alpine/v3.11/main/\
"

RUN apk --no-cache $ALPINE_REPOS upgrade && \
 apk --no-cache $ALPINE_REPOS add \
 git libevent nodejs npm

WORKDIR /app

RUN git clone https://github.com/AmeyaJoshi1/testcafe.git . && \
    git checkout local_stability_check_exp && \
    npm install && \
    npm install testcafe-browser-provider-browserstack && \
    ./node_modules/.bin/gulp fast-build && \
    chmod +x /bin/testcafe-with-v8-flag-filter.js && \
    chmod +x /opt/testcafe/docker/testcafe-docker.sh && \
    adduser -D user

USER user
ENTRYPOINT ["/opt/testcafe/docker/testcafe-docker.sh"]


