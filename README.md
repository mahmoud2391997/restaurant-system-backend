# Restaurant Operating System - Backend API

A comprehensive Node.js Express backend with Firebase integration for restaurant management.

## Features

- 🔥 **Firebase Integration**: Firestore for persistent data, Realtime Database for live updates
- 🔐 **Authentication**: Firebase Auth with role-based access control
- 📊 **Real-time Updates**: Live order tracking and POS synchronization
- 🛡️ **Security**: Rate limiting, input validation, error handling
- 📝 **Logging**: Comprehensive logging with Winston
- 🚀 **TypeScript**: Full type safety throughout the application

## Quick Start

### Prerequisites

- Node.js 18+ 
- Firebase project with Firestore and Realtime Database enabled
- Firebase service account key

### Installation

\`\`\`bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your Firebase service account key to .env
# Build the project
npm run build

# Start development server
npm run dev

# Start production server
npm start
\`\`\`

### Environment Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Firestore and Realtime Database
3. Generate a service account key from Project Settings > Service Accounts
4. Add the service account JSON to your `.env` file

### API Endpoints

#### Authentication
- `POST /api/auth/verify` - Verify Firebase ID token
- `GET /api/auth/me` - Get current user info

#### Menu Management
- `GET /api/menu` - Get all menu items (with pagination)
- `GET /api/menu/:id` - Get specific menu item
- `POST /api/menu` - Create new menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item
- `GET /api/menu/category/:category` - Get items by category
- `PATCH /api/menu/:id/availability` - Toggle item availability

#### Order Management
- `GET /api/orders` - Get all orders (with pagination)
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/active` - Get active orders
- `GET /api/orders/status/:status` - Get orders by status
- `PATCH /api/orders/:id/cancel` - Cancel order

#### POS System
- `POST /api/pos/status` - Update POS terminal status
- `GET /api/pos/status` - Get POS system status

## Architecture

### Database Structure

#### Firestore Collections (Non-realtime data)
- `menu-items` - Menu items and categories
- `customers` - Customer information and preferences
- `employees` - Staff information and roles
- `suppliers` - Supplier details
- `inventory` - Stock items and levels
- `reports` - Generated reports and analytics

#### Realtime Database Structure (Live data)
\`\`\`
/orders/{orderId}
  - id, orderNumber, status, total, createdAt, type, customerInfo

/pos/{terminalId}
  - status, currentOrder, lastUpdated, operator

/inventory-alerts/{itemId}
  - currentStock, minStock, alertLevel, timestamp

/kitchen-display/{orderId}
  - items, status, preparationTime, priority
\`\`\`

### Security & Permissions

The system implements role-based access control with the following roles:

- **Admin**: Full system access
- **Manager**: Order management, reports, staff scheduling
- **Chef**: Kitchen orders, inventory updates
- **Waiter**: Order taking, customer service
- **Cashier**: POS operations, payment processing
- **Delivery**: Order delivery, status updates

### Real-time Features

- **Live Order Tracking**: Orders update in real-time across all connected clients
- **Kitchen Display System**: Real-time order queue for kitchen staff
- **Inventory Alerts**: Automatic low-stock notifications
- **POS Synchronization**: Multiple POS terminals stay synchronized

## Development

### Project Structure
\`\`\`
backend/
├── src/
│   ├── config/          # Firebase and app configuration
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Authentication, validation, error handling
│   ├── routes/          # API route definitions
│   ├── services/        # Firebase service layer
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Helper functions and utilities
│   └── server.ts        # Main application entry point
├── logs/                # Application logs
├── dist/                # Compiled JavaScript (generated)
└── package.json
\`\`\`

### Adding New Features

1. **Define Types**: Add new interfaces to `src/types/index.ts`
2. **Create Service**: Add database operations to `src/services/`
3. **Build Controller**: Implement business logic in `src/controllers/`
4. **Add Routes**: Define API endpoints in `src/routes/`
5. **Add Validation**: Create Joi schemas for request validation

### Testing

\`\`\`bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
\`\`\`

## Deployment

### Production Setup

1. Set `NODE_ENV=production` in your environment
2. Configure production Firebase project
3. Set up proper logging and monitoring
4. Configure reverse proxy (nginx recommended)
5. Set up SSL certificates
6. Configure backup strategies for Firestore

### Docker Deployment

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["npm", "start"]
\`\`\`

## Monitoring & Logging

- **Winston Logger**: Structured logging with multiple transports
- **Error Tracking**: Comprehensive error handling and reporting
- **Performance Monitoring**: Request timing and database query optimization
- **Health Checks**: `/health` endpoint for load balancer monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper tests
4. Submit a pull request

## License

MIT License - see LICENSE file for details
