import React, { useState } from 'react';
import { Gift, ArrowRight, Lock, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

type Step = 'form' | 'payment' | 'password';

interface FormData {
  name: string;
  diveName: string;
  roomNumber: string;
  agreed: boolean;
}

const roomPasswords: { [key: string]: string } = {
  '302': 'Room302Pass',
  '304': 'Room304Pass',
  '307': 'Room307Pass',
  '309': 'Room309Pass',
  '310': 'Room310Pass',
  '311': 'Room311Pass',
  '101': 'Room101Pass',
};

function App() {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    diveName: '',
    roomNumber: '',
    agreed: false,
  }); 
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          to_email: 'dharmikgohil395003@gmail.com',
          user_name: formData.name,
          dive_name: formData.diveName,
          room_number: formData.roomNumber,
        },
        import.meta.env.VITE_PUBLIC_KEY
      );
      setStep('payment');
    } catch (error) {
      alert('Failed to send email. Please try again.');
      console.error('Email error:', error);
    } finally {
      setSending(false);
    }
  };

  const handlePayment = () => {
    setPaymentComplete(true);
    setStep('password');
  };

  const renderForm = () => (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-6">
        {/* <Gift className="w-12 h-12 text-purple-600" /> */}
        <img src='DGF Industry.png' width={50}/>
        <h1 className="text-3xl font-bold text-gray-800 ml-3">Free Ka Maal</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 p-2 border"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile/Laptop Drive Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 p-2 border"
                value={formData.diveName}
                onChange={(e) => setFormData({ ...formData, diveName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Room Number</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 p-2 border"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
              >
                <option value="">Select Room</option>
                {[302, 304, 307, 309, 310, 311,101].map((room) => (
                  <option key={room} value={room}>
                    Room {room}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-1"
              checked={formData.agreed}
              onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the terms and conditions:
              <ul className="list-disc ml-5 mt-2">
                <li>All information provided must be accurate</li>
                <li>Payment is non-refundable</li>
                <li>Password will be revealed only after payment</li>
                <li>For personal use only</li>
              </ul>
            </span>
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending...' : (
              <>
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );

  const renderPayment = () => (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Required</h2>
        <p className="text-gray-600 mb-4">Please choose a plan and complete the payment</p>
        
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">1-Day Plan: ₹10</p>
            <p className="text-sm text-gray-600">Access valid for 24 hours</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">7-Day Plan: ₹50</p>
            <p className="text-sm text-gray-600">Access valid for 7 days</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Monthly Plan: ₹150</p>
            <p className="text-sm text-gray-600">Access valid for 30 days</p>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6 mt-4">
          <p className="font-mono text-lg">UPI ID: dharmikgohil395003@okicici</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <p className="ml-3 text-sm text-yellow-600">
              After payment, click the button below to reveal your password
            </p>
          </div>
        </div>
        <button
          onClick={handlePayment}
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          I've Completed Payment <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
  

  const renderPassword = () => (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
      <Lock className="w-16 h-16 text-purple-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Password</h2>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="font-mono text-xl">{roomPasswords[formData.roomNumber] || 'DefaultPass'}</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-600">
          Please save this password securely. You won't be able to access it again without making another payment.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      {step === 'form' && renderForm()}
      {step === 'payment' && renderPayment()}
      {step === 'password' && renderPassword()}
    </div>
  );
}

export default App;