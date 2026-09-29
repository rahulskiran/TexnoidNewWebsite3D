import { useState } from 'react';
import { ShoppingCart, X, Check, ArrowRight, ShieldCheck, Download, Sparkles, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const CartDrawer = ({ isOpen, onClose, onOpen }: CartDrawerProps) => {
  const [licenseType, setLicenseType] = useState<'standard' | 'agency'>('standard');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const basePrice = licenseType === 'standard' ? 129 : 249;
  const discountAmount = discountApplied ? Math.round(basePrice * 0.2) : 0;
  const finalPrice = basePrice - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SMILE20' || promoCode.trim().toUpperCase() === 'AGENCY20') {
      setDiscountApplied(true);
    } else {
      alert('Try promo code: SMILE20 for 20% off!');
    }
  };

  const handleCheckout = () => {
    setIsPurchased(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#bca6fc', '#7852f3', '#00b4d8', '#ffbe0b']
    });
  };

  const handleReset = () => {
    setIsPurchased(false);
    onClose();
  };

  return (
    <>
      {/* Floating Shopping Cart Button (Exact match from screenshot at bottom right) */}
      <button 
        className="floating-cart-fab"
        onClick={onOpen}
        aria-label="View shopping cart"
        id="floating-cart-trigger"
      >
        <ShoppingCart size={20} color="#ffffff" />
        <span className="cart-badge-dot">1</span>
      </button>

      {/* Slide-over Drawer */}
      {isOpen && (
        <div className="cart-overlay-backdrop" onClick={onClose}>
          <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="cart-header">
              <div className="cart-header-title-wrap">
                <span className="cart-eyebrow">CHECKOUT DRAWER</span>
                <h3 className="cart-title font-display">YOUR CART</h3>
              </div>
              <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {!isPurchased ? (
              <div className="cart-body">
                {/* Product Card */}
                <div className="cart-item-card">
                  <div className="item-thumbnail">
                    <img 
                      src="/assets/editorial_girl.jpg" 
                      alt="Agency Template Preview" 
                      className="item-thumb-img"
                    />
                    <span className="item-ver">V2.4</span>
                  </div>

                  <div className="item-info">
                    <span className="item-brand">Texnoid™</span>
                    <h4 className="item-name font-display">CREATIVE AGENCY &amp; 3D TEMPLATE</h4>
                    <p className="item-specs">React 19 + TypeScript + Three.js + Figma Kit</p>

                    <div className="license-selector">
                      <button
                        className={`license-btn ${licenseType === 'standard' ? 'active' : ''}`}
                        onClick={() => setLicenseType('standard')}
                      >
                        Standard ($129)
                      </button>
                      <button
                        className={`license-btn ${licenseType === 'agency' ? 'active' : ''}`}
                        onClick={() => setLicenseType('agency')}
                      >
                        Unlimited ($249)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Features Included List */}
                <div className="cart-inclusions">
                  <span className="inclusions-title">INCLUDED WITH YOUR LICENSE:</span>
                  <ul className="inclusions-list">
                    <li><Check size={14} className="check-icon" /> 18+ Production-ready interactive pages</li>
                    <li><Check size={14} className="check-icon" /> Interactive Three.js 3D WebGL scenes &amp; physics</li>
                    <li><Check size={14} className="check-icon" /> Complete Figma master file with auto-layout</li>
                    <li><Check size={14} className="check-icon" /> Lifetime updates &amp; commercial rights included</li>
                  </ul>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="promo-form">
                  <div className="promo-input-wrap">
                    <Tag size={14} className="promo-icon" />
                    <input 
                      type="text" 
                      placeholder="Discount code (try: SMILE20)" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="promo-input"
                    />
                  </div>
                  <button type="submit" className="promo-apply-btn">APPLY</button>
                </form>

                {discountApplied && (
                  <div className="discount-applied-pill">
                    <Check size={13} /> 20% Discount code applied successfully!
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="cart-summary-block">
                  <div className="summary-row">
                    <span>Base Template Price:</span>
                    <span>${basePrice}.00</span>
                  </div>
                  {discountApplied && (
                    <div className="summary-row discount">
                      <span>Discount (20%):</span>
                      <span>-${discountAmount}.00</span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span>Total Due Today:</span>
                    <span className="total-price">${finalPrice}.00 USD</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button 
                  className="btn-pill-lavender cart-checkout-btn"
                  onClick={handleCheckout}
                  id="complete-purchase-btn"
                >
                  <span>COMPLETE PURCHASE (${finalPrice}.00)</span>
                  <ArrowRight size={16} />
                </button>

                <div className="cart-security-badge">
                  <ShieldCheck size={14} />
                  <span>Instant digital download · 14-day satisfaction guarantee</span>
                </div>
              </div>
            ) : (
              <div className="purchase-success-view">
                <div className="purchase-icon-ring">
                  <Sparkles size={36} color="#7852f3" />
                </div>
                <h3 className="purchase-success-title font-display">PURCHASE COMPLETE!</h3>
                <p className="purchase-success-sub">
                  Receipt #TSA-884920 has been generated. Your access link and GitHub repository invitations are ready.
                </p>

                <div className="download-buttons-group">
                  <button 
                    className="btn-pill-lavender download-btn"
                    onClick={() => alert('Downloading: Texnoid_Template_v2.4.zip (48 MB)...')}
                  >
                    <Download size={15} />
                    <span>DOWNLOAD ZIP ARCHIVE</span>
                  </button>

                  <button 
                    className="btn-pill-outline download-btn"
                    onClick={() => alert('Accessing GitHub Repository link...')}
                  >
                    <span>CLONE GITHUB REPOSITORY</span>
                  </button>
                </div>

                <button className="cart-back-btn" onClick={handleReset}>
                  Back to template site
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
