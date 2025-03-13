# AI-Powered Medical Claim Processing

A sophisticated system for processing medical claims using AI, with secure authentication and efficient document handling.

## Approach

- **User Authentication:** Firebase authentication system ensures secure access, allowing only registered users to utilize the service.
- **Document Upload:** Users can upload medical claim documents through a secure interface.
- **AI Processing:** Documents are processed by GPT-4o-mini model for feature and information extraction.
- **Data Storage:** MongoDB stores extracted information, with Firebase UID-based record identification.
- **Validation:** Automated checks ensure data accuracy and completeness.
- **Results Generation:** Intuitive interface displays processing results and required actions.
- **Deployment:** Backend on Render, frontend via Vercel's global CDN network.

## Setup Instructions

1. Clone the repository
```bash
 #cd into frontend
 cd frontend
```
```bash
#cd into backend
 cd backend
```

3. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
```bash
#in your backend
MONGO_URI = your_uri
```

```bash
# In your frontend
VITE_OPEN_AI_KEY = your_openai_key
VITE_FIREBASE_API_KEY = your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN = your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID = your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET = your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID = your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID = your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID = your_firebase_measurement_id
```
4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Store Invoice Data
```javascript
POST https://ai-powered-medical-claim-processing.onrender.com/api/v1/invoice/store
```
Stores the extracted invoice data from processed medical claims.

### Get Recent Claims
```javascript
GET https://ai-powered-medical-claim-processing.onrender.com/api/v1/invoice/recent/${userId}
```
Retrieves the 5 most recent claims for a specific user.

### Get Claims Count
```javascript
GET https://ai-powered-medical-claim-processing.onrender.com/api/v1/invoice/count/${userId}
```
Returns the total number of claims made by a user.

### Get Complete Claim Details
```javascript
GET https://ai-powered-medical-claim-processing.onrender.com/api/v1/invoice/details/${claimId}
```
