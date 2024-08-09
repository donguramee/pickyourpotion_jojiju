import { twMerge } from "tailwind-merge";

export default function LikeIcon({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge("", className)}
    >
      <path
        d="M29.575 9.98734C26.275 7.73734 22.2 8.78734 20 11.3623C17.8 8.78734 13.725 7.72484 10.425 9.98734C8.67502 11.1873 7.57502 13.2123 7.50002 15.3498C7.32502 20.1998 11.625 24.0873 18.1875 30.0498L18.3125 30.1623C19.2625 31.0248 20.725 31.0248 21.675 30.1498L21.8125 30.0248C28.375 24.0748 32.6625 20.1873 32.5 15.3373C32.425 13.2123 31.325 11.1873 29.575 9.98734ZM20.125 28.1873L20 28.3123L19.875 28.1873C13.925 22.7998 10 19.2373 10 15.6248C10 13.1248 11.875 11.2498 14.375 11.2498C16.3 11.2498 18.175 12.4873 18.8375 14.1998H21.175C21.825 12.4873 23.7 11.2498 25.625 11.2498C28.125 11.2498 30 13.1248 30 15.6248C30 19.2373 26.075 22.7998 20.125 28.1873Z"
        // fill="#6F6F6F"
      />
    </svg>
  );
}
