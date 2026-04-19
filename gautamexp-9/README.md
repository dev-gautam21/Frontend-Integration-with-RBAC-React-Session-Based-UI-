# SecurityService Core (RBAC)

## Description
A comprehensive backend authentication microservice designed to implement secure role-based access handling via Spring Security. It features its own embedded database context to simulate secure user credentials retrieval and token-less session verification.

## Core Setup
- **Framework:** Spring Boot 3
- **Language:** Java 17
- **Database:** Internal JDBC H2 node
- **Security:** Spring Security filters

## Endpoints

- `/api/public/**` : Accessible to all traffic
- `/api/user/**` : Requires standard operator authentication
- `/api/admin/**` : Restricted strictly to Sysadmin level

## Startup

```bash
mvn spring-boot:run
```

- URL: `jdbc:h2:mem:securedb`
- User: `admin_user`
- Pass: `SecurePass@2026`

## Default Accounts:
- `standard_user` (User level) / pass: `user123`
- `admin_root` (Admin level) / pass: `admin123`
- `guest_user` (User level) / pass: `user123`
