# Emergency-Mind Quick Start Guide 🚀

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
# Install all dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Start the Application
```bash
# Start both frontend and backend (from root directory)
npm run dev
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## How to Use

1. **Select a Medical Specialty** - Choose from Emergency, ICU, Surgery, etc.
2. **Pick a Service** - Select the type of document you need
3. **Enter Clinical Notes** - Add your bullet points
4. **Generate Report** - Click "Generate" to create the document
5. **Save & View History** - Save reports and view them in the History page

## Available Services

- **Final Medical Report** - Comprehensive patient reports
- **Insurance Approval** - Insurance authorization requests
- **DAMA Form** - Discharge Against Medical Advice forms
- **Medical Consultation** - Specialist consultation reports
- **ICD-10 Finder** - Diagnosis code assistance
- **Police Report** - Forensic medical documentation
- **Discharge Summary** - Patient discharge documentation

## Troubleshooting

### Backend Not Starting
- Check if port 3001 is available
- Run `cd backend && npm run dev` to see detailed errors

### Frontend Not Starting
- Check if port 3000 is available
- Run `cd frontend && npm run dev` to see detailed errors

### Reports Not Saving
- Check browser console for errors
- Ensure Local Storage is enabled in your browser

## Need Help?

- Check the full [README.md](README.md) for detailed documentation
- Review the code comments for implementation details
- Create an issue if you encounter problems

---

**Happy Documenting! 🏥📄**




