import { useState, useEffect } from "react";
import "@/App.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Phone, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  Wrench, 
  Zap, 
  ShoppingBag, 
  Sparkles,
  Settings,
  Cog,
  Car,
  PaintBucket,
  Send,
  CheckCircle,
  Mail
} from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Services data
const services = [
  {
    id: 1,
    title: "СТО",
    description: "Полное техническое обслуживание и ремонт автомобилей любых марок",
    image: "https://images.unsplash.com/photo-1758767355046-1986dda2d967?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    icon: Wrench,
    featured: true
  },
  {
    id: 2,
    title: "Автоэлектрика",
    description: "Диагностика и ремонт электрооборудования автомобиля",
    image: "https://images.unsplash.com/photo-1770656505713-b0fd2f5751e6?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    icon: Zap
  },
  {
    id: 3,
    title: "Автомагазин",
    description: "Запчасти и расходные материалы по доступным ценам",
    image: "https://images.unsplash.com/photo-1631856954913-c751a44490ec?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    icon: ShoppingBag
  },
  {
    id: 4,
    title: "Полировка кузова",
    description: "Профессиональная полировка и защита лакокрасочного покрытия",
    image: "https://images.unsplash.com/photo-1761934658038-d0e6792378b1?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    icon: Sparkles
  },
  {
    id: 5,
    title: "Ремонт генераторов и стартеров",
    description: "Восстановление и замена генераторов, стартеров любой сложности",
    image: "https://images.unsplash.com/photo-1770656505767-32ed52b1a8ca?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    icon: Settings
  },
  {
    id: 6,
    title: "Ремонт рулевых реек",
    description: "Диагностика и ремонт рулевого управления",
    image: "https://images.unsplash.com/photo-1770656505813-966b8ef8d363?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    icon: Cog
  },
  {
    id: 7,
    title: "Ремонт МКПП",
    description: "Ремонт механических коробок передач",
    image: "https://images.unsplash.com/photo-1577801342097-045874893030?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    icon: Settings
  },
  {
    id: 8,
    title: "Малярно-кузовные работы",
    description: "Кузовной ремонт и покраска автомобилей",
    image: "https://images.unsplash.com/photo-1619642737579-a7474bee1044?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
    icon: PaintBucket
  }
];

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Услуги" },
    { href: "#about", label: "О нас" },
    { href: "#contacts", label: "Контакты" }
  ];

  return (
    <header 
      data-testid="main-header"
      className={`fixed top-0 left-0 right-0 z-50 header-fixed transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-md" : "bg-white/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2" data-testid="logo-link">
            <Car className="w-8 h-8 text-[#0033A0]" />
            <span className="font-bold text-lg lg:text-xl text-[#0033A0] hidden sm:block">
              Автосервис Южный
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#0F172A] hover:text-[#0033A0] font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden md:flex items-center gap-6" data-testid="header-contact">
            <div className="flex items-center gap-2 text-sm text-[#475569]">
              <Clock className="w-4 h-4 text-[#0033A0]" />
              <span>с 9:00 до 21:00</span>
            </div>
            <a 
              href="tel:+79219376137" 
              className="phone-link text-[#0033A0] font-bold"
              data-testid="header-phone"
            >
              <Phone className="w-4 h-4" />
              +7 921 937 61 37
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#0033A0]"
            data-testid="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden mobile-menu bg-white/98 border-t border-slate-100"
          data-testid="mobile-menu"
        >
          <nav className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[#0F172A] hover:text-[#0033A0] font-medium py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-[#475569]">
                <Clock className="w-4 h-4 text-[#0033A0]" />
                <span>с 9:00 до 21:00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#475569]">
                <MapPin className="w-4 h-4 text-[#0033A0]" />
                <span>Всеволожский проспект, д. 107</span>
              </div>
              <a 
                href="tel:+79219376137" 
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm w-full"
                data-testid="mobile-phone-btn"
              >
                <Phone className="w-4 h-4" />
                Позвонить
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center overflow-hidden pt-16 lg:pt-20"
      data-testid="hero-section"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <img
          src="https://images.unsplash.com/photo-1758767355046-1986dda2d967?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
          alt="Автосервис"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 
              className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-[#0033A0] leading-tight mb-4 sm:mb-6"
              data-testid="hero-title"
            >
              Полный спектр услуг по ремонту и обслуживанию легковых авто
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-[#475569] mb-6 sm:mb-8 leading-relaxed"
            data-testid="hero-subtitle"
          >
            Теплая атмосфера, индивидуальный подход, кратчайшие сроки и привлекательные цены
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="tel:+79219376137"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm text-base sm:text-lg shadow-lg whitespace-nowrap"
              data-testid="hero-cta-btn"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span>Позвонить</span>
            </a>
            <a
              href="#services"
              className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm text-base sm:text-lg"
              data-testid="hero-services-btn"
            >
              Наши услуги
            </a>
          </motion.div>

          {/* Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-6"
          >
            <div className="flex items-center gap-2 text-[#0F172A]">
              <Clock className="w-5 h-5 text-[#DA291C]" />
              <span className="font-medium">с 9:00 до 21:00</span>
            </div>
            <div className="flex items-center gap-2 text-[#0F172A]">
              <MapPin className="w-5 h-5 text-[#DA291C]" />
              <span className="font-medium">Всеволожский пр., д. 107</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  return (
    <section 
      id="services" 
      className="py-16 md:py-24 lg:py-32 bg-[#F8FAFC]"
      data-testid="services-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0033A0] mb-4"
            data-testid="services-title"
          >
            Наши услуги
          </h2>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            Профессиональный ремонт и обслуживание автомобилей любой сложности
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          data-testid="services-grid"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              className={`service-card bg-white border border-slate-100 rounded-sm overflow-hidden ${
                service.featured ? "md:col-span-2 lg:col-span-2" : ""
              }`}
              data-testid={`service-card-${service.id}`}
            >
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <service.icon className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0033A0] mb-2">
                  {service.title}
                </h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-[#0F172A] font-medium mb-4">
            Ремонт автомобиля любой сложности от А до Я
          </p>
          <a
            href="tel:+79219376137"
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm"
            data-testid="services-cta-btn"
          >
            <Phone className="w-5 h-5" />
            Записаться на ремонт
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="py-16 md:py-24 lg:py-32 bg-white"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0033A0] mb-6"
              data-testid="about-title"
            >
              О нашем автосервисе
            </h2>
            <div className="space-y-4 text-lg text-[#475569] leading-relaxed">
              <p>
                В нашем автокомплексе вы найдете <strong className="text-[#0F172A]">теплую атмосферу</strong>, 
                индивидуальный подход, кратчайшие сроки ожидания и, конечно же, 
                <strong className="text-[#0F172A]"> самые привлекательные цены</strong>.
              </p>
              <p>
                Мы выполняем малярно-кузовные и слесарные работы. Ремонт вашего автомобиля 
                любой сложности от А до Я.
              </p>
              <p>
                Наши мастера имеют многолетний опыт работы и регулярно проходят обучение, 
                чтобы предоставлять вам качественный сервис на современном оборудовании.
              </p>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Опытные мастера", icon: Wrench },
                { label: "Доступные цены", icon: CheckCircle },
                { label: "Качественные запчасти", icon: Settings },
                { label: "Гарантия на работы", icon: CheckCircle }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-[#DA291C]" />
                  <span className="text-[#0F172A] font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="rounded-sm overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1619642737579-a7474bee1044?crop=entropy&cs=srgb&fm=jpg&q=85&w=600"
                  alt="Механик за работой"
                  className="w-full h-48 lg:h-56 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-sm overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1591278169757-deac26e49555?crop=entropy&cs=srgb&fm=jpg&q=85&w=600"
                  alt="Автосервис интерьер"
                  className="w-full h-32 lg:h-40 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="pt-8">
              <div className="rounded-sm overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1770656505767-32ed52b1a8ca?crop=entropy&cs=srgb&fm=jpg&q=85&w=600"
                  alt="Ремонт двигателя"
                  className="w-full h-64 lg:h-80 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section 
      id="contacts" 
      className="py-16 md:py-24 lg:py-32 bg-[#F8FAFC]"
      data-testid="contacts-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0033A0] mb-4"
            data-testid="contacts-title"
          >
            Контакты
          </h2>
          <p className="text-lg text-[#475569]">
            Свяжитесь с нами любым удобным способом
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-6 rounded-sm shadow-lg h-full">
              <h3 className="text-lg font-bold text-[#0033A0] mb-5">
                Наши контакты
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0033A0]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#0033A0]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A] text-sm">Адрес</p>
                    <p className="text-[#475569] text-sm">Всеволожский проспект, д. 107, Всеволожск</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0033A0]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#0033A0]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A] text-sm">Телефон</p>
                    <a 
                      href="tel:+79219376137" 
                      className="text-[#DA291C] font-bold hover:underline"
                      data-testid="contact-phone-link"
                    >
                      +7 921 937 61 37
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0033A0]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#0033A0]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A] text-sm">Режим работы</p>
                    <p className="text-[#475569] text-sm">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0033A0]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#0033A0]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0F172A] text-sm">Email</p>
                    <a 
                      href="mailto:udacha1983@inbox.ru" 
                      className="text-[#DA291C] font-medium hover:underline text-sm"
                      data-testid="contact-email-link"
                    >
                      udacha1983@inbox.ru
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <a 
              href="https://yandex.ru/maps/?text=Автосервис+Южный+Всеволожский+проспект+107+Всеволожск"
              target="_blank"
              rel="noopener noreferrer"
              className="block map-container rounded-sm overflow-hidden shadow-lg h-full"
              data-testid="map-link"
            >
              <div className="relative h-full min-h-[280px]">
                <img
                  src="https://static-maps.yandex.ru/1.x/?lang=ru_RU&ll=30.654900,60.021900&z=15&l=map&size=650,300&pt=30.654900,60.021900,pm2rdm"
                  alt="Карта - Автосервис Южный"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0033A0]/10 hover:bg-transparent transition-colors duration-300 flex items-center justify-center">
                  <span className="bg-white px-4 py-2 rounded-sm shadow-md text-[#0033A0] font-medium text-sm">
                    Открыть на Яндекс.Картах
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer 
      className="bg-[#0033A0] text-white py-12"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-8 h-8 text-white" />
              <span className="font-bold text-xl">Автосервис Южный</span>
            </div>
            <p className="text-white/70 leading-relaxed">
              Профессиональный ремонт и обслуживание автомобилей любой сложности
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Навигация</h4>
            <nav className="space-y-2">
              <a href="#services" className="block text-white/70 hover:text-white transition-colors footer-link">
                Услуги
              </a>
              <a href="#about" className="block text-white/70 hover:text-white transition-colors footer-link">
                О нас
              </a>
              <a href="#contacts" className="block text-white/70 hover:text-white transition-colors footer-link">
                Контакты
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-[#DA291C]" />
                <span>Всеволожский пр., д. 107, Всеволожск</span>
              </div>
              <a 
                href="tel:+79219376137" 
                className="flex items-center gap-3 text-white hover:text-[#DA291C] transition-colors"
                data-testid="footer-phone"
              >
                <Phone className="w-5 h-5 text-[#DA291C]" />
                <span className="font-bold">+7 921 937 61 37</span>
              </a>
              <div className="flex items-center gap-3 text-white/70">
                <Clock className="w-5 h-5 text-[#DA291C]" />
                <span>Ежедневно с 9:00 до 21:00</span>
              </div>
              <a 
                href="mailto:udacha1983@inbox.ru" 
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                data-testid="footer-email"
              >
                <Mail className="w-5 h-5 text-[#DA291C]" />
                <span>udacha1983@inbox.ru</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Автосервис Южный. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
