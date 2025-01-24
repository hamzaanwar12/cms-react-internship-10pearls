import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Shield } from 'lucide-react';

const WhyUsSection: React.FC = () => {
    const features = [
        {
            icon: <CheckCircle size={40} className="text-blue-500" />,
            title: "Seamless Management",
            description: "Effortlessly organize and track your professional network with intuitive tools."
        },
        {
            icon: <Star size={40} className="text-blue-500" />,
            title: "Smart Insights",
            description: "Gain valuable insights into your connections and relationship dynamics."
        },
        {
            icon: <Shield size={40} className="text-blue-500" />,
            title: "Secure & Private",
            description: "Your data is protected with state-of-the-art security and privacy measures."
        }
    ];

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center"
            >
                {/* About Section */}
                <div className="space-y-6">
                    <motion.h2 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-gray-800"
                    >
                        About TouchBase
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-600 leading-relaxed"
                    >
                        TouchBase is designed for professionals who value meaningful connections. 
                        Our platform transforms how you manage, nurture, and leverage your professional network.
                    </motion.p>
                </div>

                {/* Why Us Section */}
                <div className="space-y-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="flex items-center space-x-4 bg-blue-50/50 p-4 rounded-xl"
                        >
                            {feature.icon}
                            <div>
                                <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default WhyUsSection;