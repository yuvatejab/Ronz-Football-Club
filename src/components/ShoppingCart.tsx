import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag, Mail, ArrowLeft, Loader2, CheckCircle2, User, Phone } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { generateWhatsAppLink } from '../lib/whatsapp';

const WHATSAPP_NUMBER = '+918142001400';

export default function ShoppingCart() {
  const { items, isOpen, cartTotal, closeCart, updateQuantity, removeItem, clearCart } = useCartStore();

  const [checkoutMode, setCheckoutMode] = useState<'cart' | 'email_form'>('cart');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Reset state when cart closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCheckoutMode('cart');
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '' });
      }, 300);
    }
  }, [isOpen]);

  const convertedTotal = Math.floor(cartTotal).toLocaleString('en-IN');

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const url = generateWhatsAppLink(WHATSAPP_NUMBER, items, cartTotal);
    window.open(url, '_blank');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/store-inquiry', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            ...formData,
            items,
            total: cartTotal
         })
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
           clearCart();
           closeCart();
        }, 3000);
      } else {
        alert("Failed to send inquiry. Please try again or use WhatsApp.");
      }
    } catch (error) {
       console.error("Email API Error:", error);
       alert("An error occurred. Please try WhatsApp instead.");
    } finally {
       setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-white text-slate-900 shadow-2xl z-50 flex flex-col font-sans overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white z-10 shadow-sm relative shrink-0">
              <div className="flex items-center gap-3">
                {checkoutMode === 'email_form' ? (
                  <button
                    onClick={() => setCheckoutMode('cart')}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                )}
                <h2 className="text-xl font-display font-black tracking-tight">
                  {checkoutMode === 'email_form' ? 'Checkout Details' : 'Your Cart'}
                </h2>
                {checkoutMode === 'cart' && (
                  <div className="ml-2 bg-[#dc2626] text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-full">
                    {items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'}
                  </div>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area - Swaps between Cart Items and Email Form */}
            <div className="flex-1 overflow-y-auto bg-slate-50 relative">
              <AnimatePresence mode="wait">
                {checkoutMode === 'cart' ? (
                  <motion.div
                    key="cart-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 h-full"
                  >
                    {items.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <ShoppingBag className="w-10 h-10 text-slate-300" />
                        </div>
                        <p className="text-lg font-medium text-slate-500">Your cart is empty</p>
                        <button
                          onClick={closeCart}
                          className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-[#dc2626] transition-colors"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-end mb-2">
                          <button
                            onClick={clearCart}
                            className="text-xs font-semibold text-slate-400 hover:text-[#dc2626] flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            Clear Cart
                          </button>
                        </div>
                        <AnimatePresence initial={false}>
                          {items.map((item) => {
                            const itemInrPrice = item.price.toLocaleString('en-IN');
                            return (
                              <motion.div
                                key={item.cartItemId}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 relative group"
                              >
                                {/* Image */}
                                <div className="w-20 h-24 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                                  {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex justify-center items-center text-[10px] font-bold text-slate-400">IMG</div>
                                  )}
                                </div>

                                {/* Info */}
                                <div className="flex flex-col flex-1 py-1">
                                  <h3 className="font-bold text-slate-900 leading-tight pr-6">{item.name}</h3>
                                  <div className="text-sm text-slate-500 mt-1 mb-auto">
                                    {item.size && item.size !== 'One Size' && (
                                      <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold">
                                        Size: {item.size}
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-end justify-between mt-3">
                                    <span className="font-bold text-slate-900">₹{itemInrPrice}</span>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-100">
                                      <button
                                        onClick={() => updateQuantity(item.cartItemId, -1)}
                                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-slate-600 disabled:opacity-50"
                                      >
                                        <Minus className="w-3.5 h-3.5" />
                                      </button>
                                      <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                                      <button
                                        onClick={() => updateQuantity(item.cartItemId, 1)}
                                        className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-slate-600"
                                      >
                                        <Plus className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Remove button */}
                                <button
                                  onClick={() => removeItem(item.cartItemId)}
                                  className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-slate-300 hover:text-[#dc2626] transition-colors hover:bg-red-50 rounded-full"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="email-form-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 h-full flex flex-col relative"
                  >
                    {isSuccess ? (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 text-center px-6">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20"
                        >
                          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">Inquiry Sent</h3>
                        <p className="text-slate-600 text-sm font-medium">
                          We've sent a confirmation to your email. Our team will contact you shortly regarding payment and fulfillment.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Delivery Information</h3>
                            <p className="text-sm text-slate-500">Enter your details to receive the order invoice and instructions.</p>
                        </div>
                        <form id="email-checkout-form" onSubmit={handleEmailSubmit} className="space-y-4 flex-1">

                          <div className="space-y-1.5 relative group">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono pl-1">Full Name</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#dc2626] transition-colors" />
                              <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all font-sans text-sm font-medium shadow-sm"
                                placeholder="Enter your full name"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5 relative group">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono pl-1">Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#dc2626] transition-colors" />
                              <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all font-sans text-sm font-medium shadow-sm"
                                placeholder="hello@example.com"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5 relative group">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono pl-1">Phone Number</label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#dc2626] transition-colors" />
                              <input
                                required
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#dc2626]/20 focus:border-[#dc2626] transition-all font-sans text-sm font-medium shadow-sm"
                                placeholder="+91 00000 00000"
                              />
                            </div>
                          </div>

                        </form>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer with Checkout Actions */}
            {items.length > 0 && !isSuccess && (
              <div className="bg-white border-t border-slate-100 p-6 flex flex-col gap-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] relative z-20 shrink-0">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-slate-500 font-medium font-sans">Estimated Total</span>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-slate-900 font-display">₹{convertedTotal}</span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Prices may vary</span>
                  </div>
                </div>

                {checkoutMode === 'cart' ? (
                  <>
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#25D366] text-white rounded-xl font-bold font-sans text-[14px] hover:bg-[#20bd5a] hover:shadow-lg hover:shadow-[#25D366]/20 transition-all group"
                    >
                      <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Send Inquiry via WhatsApp</span>
                    </button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="flex-shrink-0 mx-4 text-xs font-medium text-slate-400">or</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    <button
                      onClick={() => setCheckoutMode('email_form')}
                      className="w-full flex items-center justify-center gap-3 py-3.5 bg-slate-900 text-white rounded-xl font-bold font-sans text-[14px] hover:bg-[#dc2626] hover:shadow-lg hover:shadow-[#dc2626]/20 transition-all group"
                    >
                      <Mail className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Send Inquiry via Email</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    form="email-checkout-form"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-75 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold font-sans text-sm uppercase tracking-[0.05em] transition-all shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending Inquiry...
                      </>
                    ) : (
                      <>
                        Confirm & Send
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
