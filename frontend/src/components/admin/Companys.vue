<template>
  <b-card title="Mantenedor de Empresas">
    <b-card-body class="text-center">
      <b-card-text
        >En este mantenedor podrás crear, editar y eliminar
        Empresas.</b-card-text
      >

      <!-- Tabla mantenedor  -->
      <b-container fluid>
        <!-- User Interface controls -->
        <!-- <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Sort"
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
                    <option value="">-- none --</option>
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
          

          <b-col lg="6" class="my-1">
            <b-form-group
              label="Initial sort"
              label-for="initial-sort-select"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
            >
              <b-form-select
                id="initial-sort-select"
                v-model="sortDirection"
                :options="['asc', 'desc', 'last']"
                size="sm"
              ></b-form-select>
            </b-form-group>
          </b-col>

        

        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter"
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
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

       
          <b-col lg="6" class="my-1">
            <b-form-group
              v-model="sortDirection"
              label="Filter On"
              description="Leave all unchecked to filter on all data"
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
                <b-form-checkbox value="name">Name</b-form-checkbox>
                <b-form-checkbox value="age">Age</b-form-checkbox>
                <b-form-checkbox value="isActive">Active</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row> -->

        <b-row>
          <b-col lg="6" class="my-1">
            <b-button variant="info" @click="addEdit">Añadir Empresa</b-button>
          </b-col>
        </b-row>

        <b-row class="mb-3">
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
        >
          <template #cell(name)="row">
            {{ row.value }}
          </template>

          <template #cell(actions)="row">
            <b-button
              size="sm"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
            >
              Info modal
            </b-button>
            <!-- <b-button size="sm" @click="row.toggleDetails">
              {{ row.detailsShowing ? "Hide" : "Show" }} Details
            </b-button> -->
          </template>

          <template #row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">
                  {{ key }}: {{ value }}
                </li>
              </ul>
            </b-card>
          </template>
        </b-table>

        <b-row>
          <b-col sm="5" md="6" class="my-1">
            <b-form-group
              label="Per page"
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

        <!-- Info modal -->
        <InfoModalCompanys :infoModal="infoModal" @refrescar="datosTabla" />
      </b-container>
      <!-- Fin Tabla mantenedor  -->
    </b-card-body>
    <!-- Info modal -->
    <AddModalCompany :infoModal="infoModal" @refrescar="datosTabla" />
  </b-card>
</template>

<script>
import InfoModalCompanys from "./InfoModalCompanys.vue";
import AddModalCompany from "./AddModalCompany.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SgpeEmpresas",
  components: { InfoModalCompanys, AddModalCompany },
  data() {
    return {
      items: [],
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          class: "text-center",
        },
        {
          key: "name",
          label: "Nombre",
          sortable: true,
          sortDirection: "desc",
        },
        // {
        //   key: "isActive",
        //   label: "Is Active",
        //   formatter: (value) => {
        //     return value ? "Yes" : "No";
        //   },
        //   sortable: true,
        //   sortByFormatted: true,
        //   filterByFormatted: true,
        // },
        { key: "actions", label: "Acciones" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        name: "",
        default: false,
      },
    };
  },
  computed: {
    ...mapGetters("companys", {
      companys: "companysGet",
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  created() {
    this.datosTabla();
  },
  mounted() {
    // Set the initial number of items
    // if (
    //   this.companys.length == undefined ||
    //   this.companys.length == 0
    // ) {
    //   this.datosTabla();
    //   console.log("Carga secundaria companys");
    // }
  },
  methods: {
    ...mapActions("companys", {
      getCompanys: "getCompanysAction",
    }),
    datosTabla() {
      this.getCompanys();
      setTimeout(() => {
        this.items = this.companys;
        // Set the initial number of items
        this.totalRows = this.items.length;
      }, 500);
    },
    addEdit() {
      this.infoModal.title = `Añadir Empresa`;
      this.$root.$emit("bv::show::modal", "addEditModalCompany");
    },
    info(item, index, button) {
      this.infoModal.title = `Empresa id #${item.id}`;
      this.infoModal.name = item.name;
      // this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped></style>
