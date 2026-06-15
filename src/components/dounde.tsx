 <section id="membership" className="py-18 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-sans tracking-[0.35em] text-gold-500 font-semibold uppercase block">
            LIMITED PROVISIONS
          </span>
          <SplitTextHeading className="font-serif text-3xl md:text-4xl text-sage-900 tracking-wide font-normal">
            The Founding Edition
          </SplitTextHeading>
          <p className=" text-base text-sage-500 tracking-wide font-light">
            40 SPOTS  available worldwide. By invitation and application only.
          </p>
        </div>

        {/* Curation inclusions grid */}
        <div ref={inclusionsRef} className="grid grid-cols-2 lg:grid-cols-5 gap-6 border-b border-cream-300 pb-16">
          
          <div className="text-center p-6 bg-cream-50 rounded-xl border border-cream-200 space-y-4 shadow-sm stagger-inclusion">
            <div className="w-10 h-10 rounded-full bg-cream-200 border border-gold-300/30 flex items-center justify-center mx-auto text-gold-600">
              <Calendar size={16} />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-base text-sage-900 font-semibold tracking-wide">Women's Day Collection</h4>
              <p className="text-sm text-sage-400 font-medium tracking-wide">March 8 Delivery</p>
            </div>
          </div>

          <div className="text-center p-6 bg-cream-50 rounded-xl border border-cream-200 space-y-4 shadow-sm stagger-inclusion">
            <div className="w-10 h-10 rounded-full bg-cream-200 border border-gold-300/30 flex items-center justify-center mx-auto text-gold-600">
              <Calendar size={16} />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-base text-sage-900 font-semibold tracking-wide">Peace Day Collection</h4>
              <p className="text-sm text-sage-400 font-medium tracking-wide">September 21 Delivery</p>
            </div>
          </div>

          <div className="text-center p-6 bg-cream-50 rounded-xl border border-cream-200 space-y-4 shadow-sm col-span-2 lg:col-span-1 stagger-inclusion">
            <div className="w-10 h-10 rounded-full bg-cream-200 border border-gold-300/30 flex items-center justify-center mx-auto text-gold-600">
              <Compass size={16} />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-base text-sage-900 font-semibold tracking-wide">Founder Correspondence</h4>
              <p className="text-sm text-sage-400 font-medium tracking-wide">Direct Consultation Lines</p>
            </div>
          </div>

          <div className="text-center p-6 bg-cream-50 rounded-xl border border-cream-200 space-y-4 shadow-sm stagger-inclusion">
            <div className="w-10 h-10 rounded-full bg-cream-200 border border-gold-300/30 flex items-center justify-center mx-auto text-gold-600">
              <Layers size={16} />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-base text-sage-900 font-semibold tracking-wide">Early Access</h4>
              <p className="text-sm text-sage-400 font-medium tracking-wide">To All Future Editions</p>
            </div>
          </div>

          <div className="text-center p-6 bg-cream-50 rounded-xl border border-cream-200 space-y-4 shadow-sm stagger-inclusion">
            <div className="w-10 h-10 rounded-full bg-cream-200 border border-gold-300/30 flex items-center justify-center mx-auto text-gold-600">
              <Gem size={16} />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-base text-sage-900 font-semibold tracking-wide">Priority Renewal</h4>
              <p className="text-sm text-sage-400 font-medium tracking-wide">Lifetime Locked Rights</p>
            </div>
          </div>

        </div>

        {/* Pricing Block */}
        <div ref={pricingBlockRef} className="pt-16 max-w-md mx-auto text-center space-y-6">
          <div className="space-y-2 stagger-pricing">
            <p className="text-[13px] uppercase tracking-[0.2em] text-sage-900 font-semibold font-sans">
              Annual Membership
            </p>
            <p className="text-base text-sage-600 font-sans font-light italic leading-relaxed">
              Limited strictly to forty active members globally. By invitation and application only.
            </p>
          </div>
          <button
            id="pricing-request-access"
            onClick={() => setIsApplicationOpen(true)}
            className="w-full py-8 bg-sage-900 hover:bg-gold-600 hover:shadow-lg text-cream-100 uppercase tracking-[0.25em] text-xs font-sans font-bold transition-all duration-500 rounded-full cursor-pointer shadow-md"
          >
            Request an Invitation

          </button>
        </div>
      </section>