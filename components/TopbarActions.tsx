import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../utils/translations';

const TopbarActions: React.FC = () => {
    const { language } = useTheme();
    const t = translations[language] as any;

    return (
        <div className="flex items-center gap-4 text-white">
            <span className="text-sm">{t.bengali || 'বাংলা'}</span>
        </div>
    );
};

export default TopbarActions;
