import { createSlice } from "@reduxjs/toolkit";
//import { enrollments } from "../Database";
const initialState = {
  enrollments: [],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, { payload: { userId, courseId } }) => {
      const newEnrollment: any = {
          _id: new Date().getTime().toString(),
          user: userId,
          course: courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    deleteEnrollment: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
          (enrollment: any) =>
              enrollment.user !== userId || enrollment.course !== courseId
      ) as any;
    },
  },
});

export const { setEnrollments, addEnrollment, deleteEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;