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
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
RUN npm install --production --registry=https://registry.npm.taobao.org

# 暴露容器端口
EXPOSE 1999

# 启动node应用
CMD serve -s docs