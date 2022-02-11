<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row class="mt-5">
      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filtrar por"
          description="Se buscará en todos los campos si no se especifica el filtro."
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="id">ID</b-form-checkbox>
            <b-form-checkbox value="name">Nombre</b-form-checkbox>
            <b-form-checkbox value="isActive">Estado</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Orden"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- ninguno --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filtro"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Búsqueda..."
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Limpiar</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="6" class="my-1 d-flex flex-row-reverse">
        <b-button variant="info" class="w-sm-100" id="add" @click="addEdit"
          >Añadir convenio</b-button
        >
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
      class="mt-5"
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >
          <b-icon icon="wrench" aria-hidden="true"></b-icon>
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? "Esconder" : "Ver" }} Detalles
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <!-- <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li> -->
            <ul>
              <li>
                <b>Nombre Empresa: </b>
                {{
                  row.item.name.first + " " + row.item.name.last ||
                  "Sin información"
                }}
              </li>
              <li>
                <b>Fecha inicio Convenio: </b>
                {{ row.item.dateStart || "Sin información" }}
              </li>
              <li>
                <b>Fecha fin Convenio: </b>
                {{ row.item.dateEnd || "Sin información" }}
              </li>
              <li>
                <b>Ingresado por: </b>
                {{ row.item.addBy || "Sin información" }}
              </li>
              <li>
                <b>Aprobado por: </b>
                {{ row.item.passedBy || "Sin información" }}
              </li>
              <li>
                <b>Estado Convenio : </b>
                {{ row.item.isActive ? "Vigente" : "Vencido" }}
              </li>
              <li>
                <b>Documento : </b>
                <a :href="row.item.document" target="_blank">{{
                  row.item.document || "Sin documento"
                }}</a>
              </li>
            </ul>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Por página"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- añadir modal -->
    <AddModal :modalAddEdit="modalAddEdit" />

    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      hide-footer
      @hide="resetInfoModal"
    >
      <div class="d-flex justify-content-between">
        <router-link
          :to="{ name: 'editar', params: { id: infoModal.id } }"
          class="btn btn-success"
          >Activar</router-link
        >
        <router-link
          :to="{ name: 'editar', params: { id: infoModal.id } }"
          class="btn"
          style="background-color: #f5c6cb"
          >Desactivar</router-link
        >
        <br />
        <button @click="addEdit" id="edit" class="btn btn-info">
          <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
        </button>

        <router-link
          :to="{ name: 'eliminar', params: { id: infoModal.id } }"
          class="btn btn-danger"
        >
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon
        ></router-link>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import AddModal from "./AddModal.vue";
export default {
  components: { AddModal },
  data() {
    return {
      items: [
        {
          isActive: true,
          id: 40,
          name: { first: "Dickerson", last: "Macdonald" },
          dateStart: "01-01-2022",
          dateEnd: "31-12-2022",
          addBy: "Felipe Mancilla",
          passedBy: "Jhon Doe",
          document: `documents/document.pdf`,
          _rowVariant: "success",
        },
        {
          isActive: false,
          id: 21,
          name: { first: "Larsen", last: "Shaw" },
          dateStart: "01-01-2022",
          dateEnd: "31-12-2022",
          _rowVariant: "danger",
        },
        {
          isActive: false,
          id: 9,
          name: { first: "Mini", last: "Navarro" },
          dateStart: "01-01-2022",
          dateEnd: "31-12-2022",
          _rowVariant: "danger",
        },
        {
          isActive: false,
          id: 89,
          name: { first: "Geneva", last: "Wilson" },
          dateStart: "01-01-2022",
          dateEnd: "31-12-2022",
          _rowVariant: "danger",
        },
        {
          isActive: true,
          id: 38,
          name: { first: "Jami", last: "Carney" },
          dateStart: "01-01-2022",
          dateEnd: "31-12-2022",
          _rowVariant: "success",
        },
        {
          isActive: false,
          id: 27,
          name: { first: "Essie", last: "Dunlap" },
          dateStart: "01-01-2022",
          dateEnd: "31-12-2022",
          _rowVariant: "danger",
        },
        {
          isActive: true,
          id: 40,
          name: { first: "Thor", last: "Macdonald" },
          dateStart: "01-01-2022",
          dateEnd: "31-12-2022",
          _rowVariant: "success",
        },
        {
          isActive: true,
          id: 87,
          name: { first: "Larsen", last: "Shaw" },
          dateStart: "01-01-2022",
          dateEnd: "31-12-2022",
          _rowVariant: "success",
        },
        {
          isActive: false,
          id: 26,
          name: { first: "Mitzi", last: "Navarro" },
          _rowVariant: "danger",
        },
        {
          isActive: false,
          id: 22,
          name: { first: "Genevieve", last: "Wilson" },
          dateStart: "01-01-2022",
          dateEnd: "31-12-2022",
          _rowVariant: "danger",
        },
        {
          isActive: true,
          id: 38,
          name: { first: "John", last: "Carney" },
          dateStart: "01-01-2022",
          dateEnd: "31-12-2022",
          _rowVariant: "success",
        },
        {
          isActive: false,
          id: 29,
          name: { first: "Dick", last: "Dunlap" },
          dateStart: "01-01-2022",
          dateEnd: "31-12-2022",
          _rowVariant: "danger",
        },
      ],
      fields: [
        {
          key: "id",
          label: "ID Convenio",
          sortable: true,
          class: "text-center",
        },
        {
          key: "name",
          label: "Nombre Empresa",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "isActive",
          label: "Estado Convenio",
          formatter: (value) => {
            return value ? "Vigente" : "No vigente";
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Mostrar todos" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      modalAddEdit: { title: "" },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Acciones para el ID convenio #${item.id}`;
      // this.infoModal.content = JSON.stringify(item, null, 2);
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    addEdit(e) {
      if (e.target.id == "add") {
        this.modalAddEdit.title = "Añadir Convenio";
      } else {
        this.modalAddEdit.title = "Editar Convenio";
      }
      this.$root.$emit("bv::show::modal", "addEditConvenioModal");
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
