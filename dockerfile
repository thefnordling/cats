FROM microsoft/dotnet:sdk AS build-env
COPY . /app

WORKDIR /app/Models
RUN dotnet restore

WORKDIR /app/Services
RUN dotnet restore

WORKDIR /app/Ui
RUN dotnet restore
RUN dotnet build
RUN dotnet publish -c Release -o /app/ui/out

# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/ui/out .
EXPOSE 5000/tcp
ENV ASPNETCORE_URLS http://*:5000
ENTRYPOINT ["dotnet", "Ui.dll"]