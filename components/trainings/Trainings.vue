<template>
  <div>
    <Table border :columns="columns" :data="trainings">
      <template slot-scope="{ row }" slot="trainingName">
        <strong>{{ row.trainingName }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">Düzenle</Button>
      </template>
    </Table>

    <Modal
      v-model="modal"
      :title="`Kategori ${title}`"
      @on-ok="handleClick"
      @on-cancel="handleCancel">
      <Form class="p-0"
            ref="formData"
            :model="formData"
            :rules="formRule"
            enctype="multipart/form-data"
            method="post">

        <!-- Training Name -->
        <FormItem prop="trainingName" :label="$t('eduTrainingName')" label-position="top">
          <Input
            v-model="formData.trainingName"
            :placeholder="$t('eduTrainingName')"/>
        </FormItem>

        <!-- Training Status -->
        <FormItem prop="trainingStatus" :label="$t('eduTrainingStatus')" label-position="top">
          <Select
            v-model="formData.trainingStatus"
            :placeholder="$t('eduTrainingStatus')">
            <Option :value="`${st.value}`" v-for="st in status" :key="st.value">{{ $t(st.text) }}</Option>
          </Select>
        </FormItem>
      </Form>

    </Modal>
  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";
import {TRAINING_CREATE, TRAINING_UPDATE, TRAININGS} from "@/store/constants";

export default {
  props: {
    create: {
      type: Boolean
    }
  },
  data () {
    return {
      title: '',
      modal: false,
      columns: [
        {
          title: 'Kategori Adı',
          slot: 'trainingName'
        },
        {
          title: 'Durum',
          key: 'trainingStatus'
        },
        {
          title: 'İşlem',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      formRule: {
        trainingName: this.$required({required: true, min:2, type: 'string'}),
        trainingStatus: this.$required({required: true})
      },
      formData: {
        trainingId: null,
        trainingName: '',
        trainingStatus: '1',
      }
    }
  },
  computed: {
    ...mapState('trainings', {
      trainings: state => state.trainings.data
    }),
    ...mapState({
      status: state => state.status
    }),
  },
  methods: {
    ...mapActions('trainings', {
      handleTraining: TRAININGS,
      handleTrainingCreate: TRAINING_CREATE,
      handleTrainingUpdate: TRAINING_UPDATE
    }),
    show (index) {
      this.title = 'Güncelle'
      this.formData.index = index
      this.formData.trainingId = this.trainings[index].trainingId
      this.formData.trainingName = this.trainings[index].trainingName
      this.formData.trainingStatus = this.trainings[index].trainingStatus
      this.modal = true
    },
    remove (index) {
      this.trainings.splice(index, 1);
    },
    handleClick () {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          if (this.formData.trainingId === null) {
            this.handleTrainingCreate(this.formData)
          } else {
            this.handleTrainingUpdate(this.formData)
          }
        } else {
          this.modal = true
          this.$Message.error(this.$t('form.error'));
        }
      })
    },
    handleCancel () {
      this.formData.trainingId = null
      this.formData.trainingName = ''
      this.formData.trainingStatus = '1'
    },
  },
  mounted() {
    this.handleTraining()
  },
  watch: {
    create () {
      this.title = 'Oluştur'
      this.handleCancel()
      this.modal = true
    }
  }
}
</script>
