// Reusable Card component for displaying content in a boxed layout

const Card = ({
  children,
  className = '',
  title,
  subtitle,
  hover = false,
  onClick
}) => {
  // Base card styles
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200';

  // Hover effect styles
  const hoverStyles = hover ? 'hover:shadow-lg hover:scale-102 cursor-pointer' : '';

  // Combine all styles
  const cardStyles = `${baseStyles} ${hoverStyles} ${className}`;

  return (
    <div className={cardStyles} onClick={onClick}>
      {/* Card header - only render if title or subtitle exists */}
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {title && (
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Card content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
