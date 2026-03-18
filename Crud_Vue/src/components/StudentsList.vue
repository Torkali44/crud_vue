<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-primary">Students Directory</h2>
      <button class="btn btn-primary" @click="showModal = true">
        Add Student
      </button>
    </div>

    <div class="table-responsive shadow-sm rounded">
      <table
        class="table table-hover table-striped mb-0 align-middle text-center"
      >
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th style="width: 220px">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.city }}</td>
            <td>
              <div class="d-flex justify-content-center gap-2">
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="openEditModal(student)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="deleteStudent(student.id)"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot class="table-light">
          <tr>
            <td colspan="4" class="text-muted fw-bold">
              # of students: {{ students.length }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div
      class="modal d-block"
      tabindex="-1"
      v-if="showModal"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title text-primary">Add New Student</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>

          <div class="modal-body">
            <form
              @submit.prevent="addStudent"
              :class="{ 'was-validated': formSubmitted }"
              novalidate
            >
              <div class="mb-3 text-start">
                <label for="studentName" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="studentName"
                  v-model="newStudent.name"
                  required
                />
                <div class="invalid-feedback">Please enter a valid name.</div>
              </div>

              <div class="mb-3 text-start">
                <label for="studentCity" class="form-label">City</label>
                <input
                  type="text"
                  class="form-control"
                  id="studentCity"
                  v-model="newStudent.city"
                  required
                />
                <div class="invalid-feedback">Please enter a valid city.</div>
              </div>

              <div class="modal-footer pb-0 pe-0 border-0">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeModal"
                >
                  Dismiss
                </button>
                <button type="submit" class="btn btn-primary">
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal d-block"
      tabindex="-1"
      v-if="showEditModal"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title text-primary">Update Student</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeEditModal"
            ></button>
          </div>

          <div class="modal-body">
            <form
              @submit.prevent="updateStudent"
              :class="{ 'was-validated': editFormSubmitted }"
              novalidate
            >
              <div class="mb-3 text-start">
                <label for="editStudentName" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="editStudentName"
                  v-model="editStudent.name"
                  required
                />
                <div class="invalid-feedback">Please enter a valid name.</div>
              </div>

              <div class="mb-3 text-start">
                <label for="editStudentCity" class="form-label">City</label>
                <input
                  type="text"
                  class="form-control"
                  id="editStudentCity"
                  v-model="editStudent.city"
                  required
                />
                <div class="invalid-feedback">Please enter a valid city.</div>
              </div>

              <div class="modal-footer pb-0 pe-0 border-0">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeEditModal"
                >
                  Dismiss
                </button>
                <button type="submit" class="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const STORAGE_KEY = "students";

const defaultStudents = [
  { id: 1, name: "Tork", city: "Assiut" },
  { id: 2, name: "ali", city: "elqusiya" },
  { id: 3, name: "ahmed", city: "assuit" },
  { id: 4, name: "elzohry", city: "cairo" },
  { id: 5, name: "sabra", city: "alex" },
];

const students = ref([...defaultStudents]);

const showModal = ref(false);
const formSubmitted = ref(false);
const newStudent = ref({ name: "", city: "" });

const showEditModal = ref(false);
const editFormSubmitted = ref(false);
const editStudent = ref({ id: null, name: "", city: "" });

onMounted(() => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    students.value = parsed;
  } catch {
  }
});

watch(
  students,
  (val) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    } catch {
    }
  },
  { deep: true }
);

const addStudent = () => {
  formSubmitted.value = true;

  if (!newStudent.value.name.trim() || !newStudent.value.city.trim()) {
    return;
  }

  const nextId =
    students.value.length > 0
      ? Math.max(...students.value.map((s) => s.id)) + 1
      : 1;

  students.value.push({
    id: nextId,
    name: newStudent.value.name.trim(),
    city: newStudent.value.city.trim(),
  });

  closeModal();
};

const openEditModal = (student) => {
  editStudent.value = { ...student };
  editFormSubmitted.value = false;
  showEditModal.value = true;
};

const updateStudent = () => {
  editFormSubmitted.value = true;

  if (!editStudent.value.name.trim() || !editStudent.value.city.trim()) {
    return;
  }

  const idx = students.value.findIndex((s) => s.id === editStudent.value.id);
  if (idx === -1) return;

  students.value[idx] = {
    id: editStudent.value.id,
    name: editStudent.value.name.trim(),
    city: editStudent.value.city.trim(),
  };

  closeEditModal();
};

const closeEditModal = () => {
  showEditModal.value = false;
  editFormSubmitted.value = false;
  editStudent.value = { id: null, name: "", city: "" };
};

const deleteStudent = (id) => {
  const ok = window.confirm("Are you sure you want to delete this student?");
  if (!ok) return;
  students.value = students.value.filter((s) => s.id !== id);
};

const closeModal = () => {
  showModal.value = false;
  formSubmitted.value = false;
  newStudent.value = { name: "", city: "" };
};
</script>
