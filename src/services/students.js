import { StudentsCollection } from '../db/models/student.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllStudents = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const studentsQuery = StudentsCollection.find();

  if (filter.gender) {
    studentsQuery.where('gender').equals(filter.gender);
  }
  if (filter.maxAge) {
    studentsQuery.where('age').lte(filter.maxAge);
  }
  if (filter.minAge) {
    studentsQuery.where('age').gte(filter.minAge);
  }
  if (filter.maxAvgMark) {
    studentsQuery.where('avgMark').lte(filter.maxAvgMark);
  }
  if (filter.minAvgMark) {
    studentsQuery.where('avgMark').gte(filter.minAvgMark);
  }

  const [studentsCount, students] = await Promise.all([
    StudentsCollection.find().merge(studentsQuery).countDocuments(),
    studentsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(studentsCount, limit, page);

  return {
    data: students,
    ...paginationData,
  };
};

export const getStudentById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId).populate('parentId');
  return student;
};

export const addStudent = async (studentData) => {
  const student = new StudentsCollection(studentData);
  await student.save();
  return student;
};

export const deleteStudent = async (studentId) => {
  const student = await StudentsCollection.findByIdAndDelete(studentId);
  return student;
};

export const createStudent = async (payload) => {
  const student = await StudentsCollection.create(payload);
  return student;
};

export const updateStudent = async (studentId, studentData, options = {}) => {
  const student = await StudentsCollection.findOneAndUpdate({ _id: studentId }, studentData, {
    new: true,
    upsert: true,
    runValidators: true,
    ...options,
  });

  if (!student) return null;

  return {
    student,
    isNew: Boolean(student?.lastErrorObject?.upserted),
  };
};

export const patchStudent = async (studentId, payload, options = {}) => {
  const student = await StudentsCollection.findOneAndUpdate({ _id: studentId }, payload, {
    new: true,
    runValidators: true,
    ...options,
  });

  if (!student) return null;

  return {
    student,
  };
};
