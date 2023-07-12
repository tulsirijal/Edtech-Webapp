import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { COURSE_STATUS } from "../../../../utils/constants";
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import { deleteCourse } from "../../../../services/operations/courseDetailsApi";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import formatDate from "../../../../utils/dateFormatter";
export default function CourseTable({ courses, setCourses }) {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  async function handleDelete(id){
    await deleteCourse({courseId:id},token);
    setConfirmationModal(null);
    window.location.reload()
  }
  const TRUNCATE_LENGTH = 30;
  return (
    <div>
      <Table className="rounded-xl border border-richblack-800">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className=" hidden md:flex flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              {" "}
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">No courses found</Td>
            </Tr>
          ) : (
            courses.map((course) => {
              return (
                <Tr key={course._id} className='flex gap-x-14   border-b border-richblack-800 md:px-6 md:py-8 '>
                  <Td className="flex flex-1  md:gap-x-4 ">
                    <img
                      src={course.thumbnail}
                      className="h-[148px] w-[220px] rounded-lg object-cover"
                    />
                    <div className="flex flex-col  justify-between">
                      <p className="text-richblack-5 font-semibold text-lg">
                        {course.name}
                      </p>
                      <p className="text-xs text-richblack-300">
                        {course?.description?.split(" ").length >
                        TRUNCATE_LENGTH
                          ? course?.description
                              ?.split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : course?.description} 
                      </p>
                      <p className="text-richblack-5">Created: {formatDate(course?.createdAt)} </p>
                      {course?.status === COURSE_STATUS.DRAFT ? (
                        <p className="text-pink-50">Draft</p>
                      ) : (
                        <p className="text-yellow-50">Published</p>
                      )}
                    </div>
                  </Td>
                    <Td className='text-richblack-5'>
                      2hr 30min
                    </Td>
                    <Td className='text-richblack-5'>
                      {course?.price}
                    </Td>
                    <Td className='text-richblack-300 md:space-x-4'>
                      <button onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}>
                          <BiEdit/>
                      </button>
                      <button onClick={()=>setConfirmationModal({
                          text1:"Are you sure ? ",
                          text2:"The content of the course will be deleted",
                          btn1Text:"Delete",
                          btn2Text:"Cancle",
                          btn1Handler:()=>handleDelete(course._id),
                          btn2Handler:()=>setConfirmationModal(null),
                    
                      })}>
                          <MdDelete/>
                      </button>
                    </Td>
                  
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}
