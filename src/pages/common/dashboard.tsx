import useGet from "@/hooks/use-GetHook";
import UserTypeChart from "@/components/charts/UserCharts";
import ActivityLogsChart from "@/components/charts/ActivityLogChart";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface UserStatsResponse {
  data: {
    totalUsers: number;
    adminUsers: number;
    nonAdminUsers: number;
  };
}

interface ActivityLogsStatsResponse {
  data: {
    getCount: number;
    createCount: number;
    updateCount: number;
    deleteCount: number;
    totalLogs: number;
  };
}

export default function Dashboard() {
  const currentUser = useSelector((state: RootState) => state.userState?.user);
  // Assume you have a way to get the current user's role and ID
  // Conditional URL based on user role
  
  const userStatsUrl =
    currentUser?.role === "ADMIN"
      ? `${import.meta.env.VITE_API_BASE_URL}/users/get-stats/${
          currentUser?.id
        }`
      : null;

  const activityLogsUrl =
    currentUser?.role === "ADMIN"
      ? `${
          import.meta.env.VITE_API_BASE_URL
        }/activity-logs/get-all-logs-stats/${currentUser?.id}`
      : `${
          import.meta.env.VITE_API_BASE_URL
        }/activity-logs/get-user-logs-stats/${currentUser?.id}`;

  // Fetch data using the custom hook

  const {
    data: userStatsData,
    isLoading: isUserStatsLoading,
    isError: isUserStatsError,
  } = useGet<UserStatsResponse>(userStatsUrl || "");

  const {
    data: activityLogsData,
    isLoading: isActivityLogsLoading,
    isError: isActivityLogsError,
  } = useGet<ActivityLogsStatsResponse>(activityLogsUrl);

  // Render loading or error states
  if (isUserStatsLoading || isActivityLogsLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (isUserStatsError || isActivityLogsError) {
    return (
      <div className="p-4 text-center text-red-500">Error loading data</div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentUser?.role === "ADMIN" && userStatsData && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">User Distribution</h2>
            <UserTypeChart data={userStatsData.data} />
          </div>
        )}

        {activityLogsData && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Activity Logs</h2>
            <ActivityLogsChart data={activityLogsData.data} />
          </div>
        )}
      </div>
    </div>
  );
}
