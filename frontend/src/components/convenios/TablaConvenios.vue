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
        <b-button
          variant="info"
          class="w-sm-100"
          id="add"
          @click="addEdit"
          v-if="
            user_data.id_permissions === 1 || user_data.id_permissions === 2
          "
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
        <!-- {{ row.value.first }} {{ row.value.last }} -->
        {{ row.value }}
      </template>

      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
          v-if="
            user_data.id_permissions == 1 ||
            user_data.id_permissions == 3 ||
            user_data.id_permissions == 5
          "
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
                {{ row.item.name || "Sin información" }}
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
                <b>Editado por: </b>
                {{ row.item.editedBy || "Sin información" }}
              </li>
              <li>
                <b>Aprobado por: </b>
                {{ row.item.passedBy || "Sin información" }}
              </li>
              <li>
                <b>Desaprobado por: </b>
                {{ row.item.disapprovedBy || "Sin información" }}
              </li>
              <li>
                <b>Estado Convenio : </b>
                {{ row.item.isActive ? "Activo" : "No activo" }}
              </li>
              <li>
                <b>Documento : </b>
                <a
                  v-if="row.item.document"
                  :href="storageUrl(row.item.document)"
                  target="_blank"
                  ><b-icon icon="file-earmark-text-fill"></b-icon>
                </a>
                <p v-else>Sin documento</p>
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
    <AddModal :infoModal="infoModal" @refrescar="datosTabla" />
    <!-- Info modal -->
    <InfoModal
      :infoModal="infoModal"
      @datosTabla="datosTabla"
      @resetInfoModal="resetInfoModal"
      @addEdit="addEdit"
    />
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddModal from "./AddModal.vue";
import InfoModal from "./InfoModal.vue";

export default {
  components: { AddModal, InfoModal },
  data() {
    return {
      items: [],
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
            return value ? "Activo" : "No activo";
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
        content: {
          name: "",
          dateStart: "",
          dateEnd: "",
          document: "",
        },
      },
    };
  },

  computed: {
    ...mapState("access", ["user_data"]),
    ...mapState("convenios", ["convenios"]),
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
    /*
     ? importante
     * Con el setTimeOut soluciono el problema de la reactividad del paso de los valores
     *  de la props, se puede con una propiedad computada, pero inicia primero como objeto lo
     * que genera error, por lo que un setTImeOut no genera este error si el primera valor es
     * un arreglo vacío
     */

    this.datosTabla();
  },
  methods: {
    ...mapActions("convenios", {
      getConvenios: "getConveniosAction",
    }),
    info(item, index, button) {
      this.infoModal.title = `Convenio #${item.id}`;
      // this.infoModal.content = JSON.stringify(item, null, 2);
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    addEdit(e) {
      if (e.target.id == "add") {
        this.infoModal.title = "Añadir Convenio";
      } else {
        this.infoModal.title = "Convenio #" + this.infoModal.content.id;
        // console.log("DataSet", this.infoModal.content);
      }
      this.$root.$emit("bv::show::modal", "addEditConvenioModal");
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    storageUrl(data) {
      const arreglo = data.split("/");
      return "http://localhost:8888/storage/" + arreglo[1];
    },
    datosTabla() {
      this.getConvenios();
      setTimeout(() => {
        this.items = this.convenios;
        // Set the initial number of items
        this.totalRows = this.items.length;
      }, 500);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = {
        name: "",
        dateStart: "",
        dateEnd: "",
        document: "",
      };
    },
  },
};
</script>
