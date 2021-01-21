# 设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM node:14.8.0-alpine3.12
# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

COPY . /app/

# 设置工作目录
WORKDIR /app

# 安装npm依赖(使用淘宝的镜像源)
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
RUN npm run build-examples

# 启动node应用
CMD npm run start-docs