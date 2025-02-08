import React, { useState } from 'react';
import { Gift, ArrowRight, Lock, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PayPalButtons } from "@paypal/react-paypal-js";

type Step = 'form' | 'payment' | 'password';

interface FormData {
  name: string;
  diveName: string;
  agreed: boolean;
}

function App() {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    diveName: '',
    agreed: false,
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,  // Service ID
        import.meta.env.VITE_TEMPLATE_ID, // Template ID
        {
          to_email: 'dharmikgohil395003@gmail.com',  // Receiver's email
          user_name: formData.name,
          dive_name: formData.diveName,
        },
        import.meta.env.VITE_PUBLIC_KEY   // Public Key
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
    setStep('password');
  };

  const renderForm = () => (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <img src="DGF Industry.png" width={100} />
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Dive Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 p-2 border"
              value={formData.diveName}
              onChange={(e) => setFormData({ ...formData, diveName: e.target.value })}
            />
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
                <li>Monday to Friday 7am to 8am & 5pm to 7pm & 9pm to 12pm Wifi Use Time</li>
                <li>Saturday & Sunday 24/7</li>
                <li>If FML is not working, visit <a>dharmikgohil.fun</a> for support</li>
                <li>For personal use only</li>
                <li>T&C Apply</li>
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
        <p className="text-gray-600 mb-4">Please pay ₹10 to continue</p>
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="font-mono text-lg">UPI ID: dharmikgohil395003@okicici</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <p className="ml-3 text-sm text-yellow-600">
              After payment, click the button below to reveal your password.
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
        <p className="font-mono text-xl">FreeKaMal2024</p>
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
