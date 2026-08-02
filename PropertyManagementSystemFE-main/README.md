# Property Management System

A comprehensive property management system built with React frontend and Spring Boot backend, featuring complete CRUD operations, authentication, and automated deployment.

## Features

### Frontend (React + TypeScript)
- **Authentication**: Complete signup/login system with JWT tokens
- **Property Management**: Add, edit, view, delete properties with filtering
- **Tenant Management**: Comprehensive tenant information tracking
- **Lease Management**: Contract creation and management with terms
- **Payment Tracking**: Rent collection and payment status monitoring
- **Advanced Filtering**: Search and filter across all modules
- **Responsive Design**: Mobile-friendly interface with warm color scheme

### Backend (Spring Boot)
- **RESTful APIs**: Complete CRUD operations for all entities
- **JWT Authentication**: Secure token-based authentication
- **MySQL Database**: Persistent data storage with relationships
- **Security**: Role-based access control and data validation
- **Advanced Queries**: Filtering and search capabilities

## Project Structure

```
property-management-system/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service calls
│   │   └── types/           # TypeScript interfaces
│   ├── Dockerfile           # Frontend container
│   └── nginx.conf           # Nginx configuration
├── backend/                 # Spring Boot application
│   ├── src/main/java/com/pms/
│   │   ├── controller/      # REST controllers
│   │   ├── service/         # Business logic
│   │   ├── repository/      # Data access layer
│   │   ├── model/           # Entity classes
│   │   ├── dto/             # Data transfer objects
│   │   ├── config/          # Configuration classes
│   │   └── security/        # Security components
│   ├── Dockerfile           # Backend container
│   └── pom.xml              # Maven dependencies
├── database/
│   └── init.sql             # Database initialization
├── docker-compose.yml       # Container orchestration
└── Jenkinsfile             # CI/CD pipeline
```

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Java 17+ (for local development)
- Node.js 18+ (for local development)
- MySQL 8.0+ (for local development)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd property-management-system
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Database: localhost:3306

### Local Development

#### Backend Setup
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Properties
- `GET /api/properties` - Get all properties (with filtering)
- `POST /api/properties` - Create new property
- `PUT /api/properties/{id}` - Update property
- `DELETE /api/properties/{id}` - Delete property

### Tenants
- `GET /api/tenants` - Get all tenants (with filtering)
- `POST /api/tenants` - Create new tenant
- `PUT /api/tenants/{id}` - Update tenant
- `DELETE /api/tenants/{id}` - Delete tenant

### Leases
- `GET /api/leases` - Get all leases (with filtering)
- `POST /api/leases` - Create new lease
- `PUT /api/leases/{id}` - Update lease
- `DELETE /api/leases/{id}` - Delete lease

### Payments
- `GET /api/payments` - Get all payments (with filtering)
- `GET /api/payments/stats` - Get payment statistics
- `POST /api/payments` - Create new payment
- `PUT /api/payments/{id}` - Update payment
- `PUT /api/payments/{id}/mark-paid` - Mark payment as paid
- `DELETE /api/payments/{id}` - Delete payment

## Database Schema

The system uses MySQL with the following main entities:
- **Users**: System users with authentication
- **Properties**: Property information and details
- **Tenants**: Tenant information and lease details
- **Leases**: Lease agreements and terms
- **Payments**: Payment tracking and history

## Deployment

### Docker Deployment
The system is containerized with:
- **Frontend**: Nginx serving React build
- **Backend**: Spring Boot application
- **Database**: MySQL with initialization scripts

### Jenkins CI/CD Pipeline
The included Jenkinsfile provides:
- Automated building and testing
- Docker image creation
- Health checks
- Staging and production deployments
- Email notifications

### Environment Variables
Configure these environment variables:
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `JWT_SECRET`: JWT signing secret

## Security Features

- JWT-based authentication
- Password encryption with BCrypt
- Role-based access control
- CORS configuration
- Input validation and sanitization
- SQL injection prevention

## Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.