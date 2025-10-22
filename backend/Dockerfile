# Usar la imagen oficial de .NET 8 SDK para build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar archivo de proyecto y restaurar dependencias
COPY RealEstate.Api/*.csproj ./RealEstate.Api/
RUN dotnet restore ./RealEstate.Api/RealEstate.Api.csproj

# Copiar el código fuente y compilar
COPY RealEstate.Api/ ./RealEstate.Api/
RUN dotnet publish ./RealEstate.Api/RealEstate.Api.csproj -c Release -o out

# Usar imagen runtime para la app final
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Exponer el puerto
EXPOSE 8080

# Configurar variables de entorno para Railway
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Comando para ejecutar la aplicación
ENTRYPOINT ["dotnet", "RealEstate.Api.dll"]