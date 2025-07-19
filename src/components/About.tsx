export const About = () => {
  return (
    <section className="py-24 px-6 bg-gradient-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Empowering Beauty Excellence
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Panache Expo is a charitable organization dedicated to celebrating and advancing 
            the beauty industry through education, recognition, and community empowerment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">🎨</span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-primary mb-4">
              Educational Excellence
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Providing top-tier workshops and training programs to elevate skills 
              and knowledge in the beauty industry.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-secondary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-rose group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">👑</span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-primary mb-4">
              Prestigious Recognition
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Honoring excellence through pageants and awards that celebrate 
              outstanding achievements in beauty and fashion.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-primary mb-4">
              Community Impact
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Building a supportive community that fosters growth, creativity, 
              and positive change in the beauty industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};