# Emergency-Mind 🚨

**AI-Powered Medical Documentation System for Healthcare Professionals**

Emergency-Mind is a full-stack web application that helps doctors from multiple specialties generate medico-legal documents using AI. The MVP uses mock AI responses and browser Local Storage, making it perfect for development, testing, and demonstration purposes.

## 🎯 Project Overview

Emergency-Mind streamlines the process of creating professional medical documents by:
- Providing specialty-specific document templates
- Using AI to generate comprehensive reports from bullet points
- Storing reports locally for easy access and management
- Offering a clean, intuitive interface for healthcare professionals

## 🏗️ Architecture

### Frontend (Next.js + TypeScript + TailwindCSS)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: TailwindCSS for responsive design
- **Storage**: Browser Local Storage for data persistence

### Backend (Express.js + TypeScript)
- **Framework**: Express.js with TypeScript
- **AI Service**: Mock provider (easily replaceable with real AI)
- **Validation**: Zod for input validation
- **Security**: Helmet for security headers, CORS configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation & Setup

1. **Clone and install dependencies:**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

2. **Start the development servers:**
   ```bash
   # From the root directory - starts both frontend and backend
   npm run dev
   
   # Or start them separately:
   # Backend (runs on http://localhost:3001)
   npm run dev:backend
   
   # Frontend (runs on http://localhost:3000)
   npm run dev:frontend
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/api/health

## 📱 Features

### 🏥 Medical Specialties
- **Emergency Medicine** - Critical care and emergency procedures
- **Intensive Care Unit** - Critical patient monitoring
- **Surgery** - Surgical procedures and operations
- **Internal Medicine** - Adult medical care and diagnosis
- **OB/GYN** - Obstetrics and gynecology care
- **Pediatrics** - Children's medical care
- **Clinic Doctor** - General practice and outpatient care
- **General Services** - General medical services

### 📄 Document Services
- **Final Medical Report** - Comprehensive patient reports
- **Insurance Approval Request** - Insurance authorization documents
- **DAMA Form** - Discharge Against Medical Advice forms
- **Medical Consultation** - Specialist consultation reports
- **ICD-10 Code Finder** - Diagnosis code assistance
- **Police Medical Report** - Forensic medical documentation
- **Discharge Summary** - Patient discharge documentation

### 💾 Data Management
- **Local Storage** - All reports saved in browser storage
- **Report History** - View, search, and filter all generated reports
- **Export Capability** - Copy and save reports as needed
- **Data Persistence** - Reports remain available between sessions

## 🔧 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and basic information.

**Response:**
```json
{
  "success": true,
  "data": {
    "ok": true,
    "message": "Backend is running",
    "timestamp": "2025-01-14T10:00:00Z",
    "version": "1.0.0"
  }
}
```

### Generate Report
```
POST /api/generate/:service
```
Generates a medico-legal document based on bullet points.

**Parameters:**
- `service` - The service type (final-report, insurance-approval, etc.)

**Request Body:**
```json
{
  "bullets": [
    "Chest pain 2h",
    "ECG AF HR 140",
    "Patient stable"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "result": "Generated report content...",
    "service": "final-report",
    "timestamp": "2025-01-14T10:00:00Z"
  }
}
```

## 📁 Project Structure

```
emergency-mind/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   │   └── providers/   # AI providers
│   │   └── server.ts        # Main server file
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # Next.js frontend
│   ├── app/                 # Next.js app directory
│   │   ├── services/        # Service pages
│   │   ├── history/         # History page
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── utils/               # Utility functions
│   │   ├── api.ts          # API client
│   │   └── localStorage.ts  # Storage utilities
│   ├── package.json
│   └── tailwind.config.js
├── package.json             # Root package.json
└── README.md
```

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev    # Start with hot reload
npm run build  # Build for production
npm start      # Start production build
```

### Frontend Development
```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production build
```

### Adding New Services
1. Add service to `validServices` array in `backend/src/middleware/validation.ts`
2. Add service mapping in `frontend/utils/api.ts`
3. Add service icon and description in frontend components
4. Update mock provider to handle new service type

### Adding New Specialties
1. Add specialty to `specialties` array in `frontend/app/page.tsx`
2. Add specialty services mapping in `frontend/utils/api.ts`
3. Add specialty styling classes in `frontend/app/globals.css`

## 🔒 Security & Privacy

- **Local Storage Only** - No data sent to external servers
- **CORS Protection** - Configured for frontend-backend communication
- **Input Validation** - All inputs validated using Zod
- **Error Handling** - Comprehensive error handling and logging
- **Security Headers** - Helmet.js for security headers

## 🚀 Deployment

### Backend Deployment
1. Build the backend: `cd backend && npm run build`
2. Deploy the `dist/` folder to your server
3. Set environment variables (PORT, NODE_ENV, etc.)
4. Start with: `npm start`

### Frontend Deployment
1. Build the frontend: `cd frontend && npm run build`
2. Deploy the `out/` folder to your hosting service
3. Update API URL in environment variables if needed

## 🔮 Future Enhancements

- **Real AI Integration** - Replace mock provider with OpenAI/Anthropic
- **Database Integration** - Add PostgreSQL/MongoDB for data persistence
- **User Authentication** - Add user accounts and role-based access
- **Report Templates** - Customizable document templates
- **Export Features** - PDF generation and email integration
- **Mobile App** - React Native mobile application
- **Analytics** - Usage tracking and reporting
- **Multi-language** - Internationalization support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, questions, or feature requests:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

## 🙏 Acknowledgments

- Built for healthcare professionals by healthcare professionals
- Inspired by the need for efficient medical documentation
- Thanks to the open-source community for amazing tools and libraries

---

**Emergency-Mind v1.0.0** - Making medical documentation faster, easier, and more accurate. 🚨⚕️




