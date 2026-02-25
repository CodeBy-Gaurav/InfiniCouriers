# Infini Couriers - Professional Courier Tracking Website

A modern, responsive courier tracking and booking website built with **Next.js 15** and **JavaScript**.

## Features

- 🎥 **Video Hero Section** - Stunning autoplay background video on homepage
- 📦 **Real-Time Tracking** - Track shipments from Delhivery and other couriers
- 💰 **Price Calculator** - Instant shipping cost and transit time estimates
- 📧 **Contact Form** - Direct communication with support team
- 🎨 **Custom Theme** - Professional blue and orange color scheme
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **Fast Performance** - Optimized with Next.js 15 App Router

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **API Integration**: Delhivery Tracking API

## Color Theme

- Primary Blue: `#1E40AF`
- Accent Orange: `#F97316`
- Light Blue: `#3B82F6`
- Background: `#F9FAFB`
- Success Green: `#10B981`
- Warning Orange: `#FBBF24`
- Error Red: `#EF4444`

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Delhivery API token (optional - mock data available)

### Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/infini_couriers?schema=public"
DELHIVERY_API_TOKEN="your_delhivery_api_token_here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. **Set up the database**:

```bash
npx prisma generate
npx prisma db push
```

5. **Add the hero video**:

Place your `hero-delivery.mp4` video file in:
```
public/videos/hero-delivery.mp4
```

> **Note**: Create the `public/videos/` directory if it doesn't exist. The video should be optimized for web (H.264 codec recommended).

6. **Run the development server**:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
InfiniCouriers/
├── app/
│   ├── api/
│   │   ├── track/route.js         # Tracking API endpoint
│   │   ├── calculate/route.js     # Price calculator API
│   │   └── contact/route.js       # Contact form API
│   ├── track/page.jsx             # Tracking page
│   ├── calculate/page.jsx         # Calculator page
│   ├── contact/page.jsx           # Contact page
│   ├── layout.jsx                 # Root layout
│   ├── page.jsx                   # Homepage
│   └── globals.css                # Global styles
├── lib/
│   └── prisma.js                  # Prisma client
├── prisma/
│   └── schema.prisma              # Database schema
├── public/
│   └── videos/
│       └── hero-delivery.mp4      # Hero video (you provide this)
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.mjs             # PostCSS configuration
└── package.json
```

## Database Schema

### TrackingRequest
- Stores tracking queries and API responses
- Caches results for 5 minutes

### ContactSubmission  
- Stores contact form submissions
- Includes name, email, phone, service type, and message

### PriceCalculation
- Logs price calculations for analytics
- Stores origin, destination, weight, and calculated price

## API Endpoints

### POST /api/track
Track a shipment by tracking number.

**Request Body**:
```json
{
  "trackingNumber": "DH12345678",
  "courier": "Delhivery"
}
```

### POST /api/calculate
Calculate shipping cost and transit time.

**Request Body**:
```json
{
  "originPincode": "400001",
  "destinationPincode": "110001",
  "weight": "2.5",
  "length": "30",
  "width": "20",
  "height": "15",
  "serviceType": "Standard"
}
```

### POST /api/contact
Submit contact form.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "serviceType": "General Query",
  "message": "Your message here"
}
```

## Configuration Notes

### Video Placement
The hero video should be placed at:
- **Path**: `public/videos/hero-delivery.mp4`
- **Recommended specs**: 
  - Format: MP4 (H.264 codec)
  - Resolution: 1920x1080 or higher
  - Duration: 10-30 seconds (loops automatically)
  - Size: Optimized for web (under 10MB recommended)

### Delhivery API Token
Add your Delhivery API token in the `.env` file:
```env
DELHIVERY_API_TOKEN="your_token_here"
```
If no token is provided, the app will use mock data for development.

### Contact Information
Update contact details in `/app/contact/page.jsx`:
- Email: Line 107
- Phone: Line 121
- Address: Lines 136-139

## Build for Production

```bash
npm run build
npm start
```

## Features in Detail

### Homepage
- Full-screen video hero with overlay
- Company branding and tagline
- Two feature cards (Track & Calculate)
- Sticky contact button (bottom-right)

### Tracking Page
- Input tracking number and select courier
- Real-time API integration with Delhivery
- Timeline view of shipment history
- Status badges with color coding
- Origin/destination display

### Calculator Page
- Pincode-based calculation
- Weight and dimension inputs
- Service type selection (Express/Standard/Economy)
- Volumetric weight calculation
- Transit time estimation
- Price breakdown (base rate + fuel + GST)

### Contact Page
- Contact information cards
- Form with validation
- Service type dropdown
- Database storage of submissions

## License

This project is private and proprietary.

## Support

For support or questions:
- Email: support@infinicouriers.com
- Phone: +91-1800-123-4567
