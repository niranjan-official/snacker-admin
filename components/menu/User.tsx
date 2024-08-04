import { FirebaseDate, UserType } from "@/types";

const User = ({ userData }: { userData: UserType }) => {
  function formatDateToYYYYMMDD(date: FirebaseDate) {
    let newDate = new Date(date.seconds * 1000);
    console.log(newDate);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  return (
    <div className="bg-dark-100 flex w-full flex-col gap-1 rounded-lg p-4 text-neutral-50 shadow shadow-blue-500">
      <div className="flex gap-2 text-neutral-400">
        Name:{" "}
        <span className="text-lg font-medium capitalize text-neutral-50">
          {userData.name}
        </span>
      </div>
      <div className="flex gap-2 text-neutral-400">
        Id:{" "}
        <div className="w-3/4 truncate text-neutral-50">{userData.userId}</div>
      </div>
      <div className="flex gap-2 text-neutral-400">
        Credits:{" "}
        <span className="text-lg font-medium capitalize text-neutral-50">
          {userData.credit}
        </span>
      </div>
      <div className="flex gap-2 text-neutral-400">
        Date of Reg:{" "}
        <span className="text-lg font-medium capitalize text-neutral-50">
          {formatDateToYYYYMMDD(userData.timeStamp)}
        </span>
      </div>
    </div>
  );
};

export default User;
