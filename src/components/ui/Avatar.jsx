// import React from 'react';
// import { UserIcon } from '../icons';

// const Avatar = ({ 
//   src, 
//   alt = "User", 
//   size = "md", 
//   className = "",
//   fallbackIcon = true 
// }) => {
//   const sizeClasses = {
//     sm: 'h-8 w-8',
//     md: 'h-10 w-10',
//     lg: 'h-12 w-12',
//     xl: 'h-16 w-16'
//   };

//   const iconSizeClasses = {
//     sm: 'h-4 w-4',
//     md: 'h-5 w-5',
//     lg: 'h-6 w-6',
//     xl: 'h-8 w-8'
//   };

//   return (
//     <div className={`${sizeClasses[size]} ${className} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center`}>
//       {src ? (
//         <img
//           src={src}
//           alt={alt}
//           className="h-full w-full object-cover"
//         />
//       ) : (
//         fallbackIcon && (
//           <UserIcon className={`${iconSizeClasses[size]} text-gray-500`} />
//         )
//       )}
//     </div>
//   );
// };

// export default Avatar;
