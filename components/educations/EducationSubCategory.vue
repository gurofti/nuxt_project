<template>
  <div>
    <Divider orientation="left">Eğitim Alt Kategorileri</Divider>
    <p>Hazırladığınız videoları alt kategoriler ile gruplandırarak eğitimizi daha düzenli hale getirebilirsiniz. </p>
    <br>

    <Form ref="formDynamic" :model="formDynamic" style="">
      <FormItem
        v-for="(item, index) in formDynamic.items"
        v-if="item.status"
        :key="index"
        :label="'Kategori Adı'"
        :prop="'items.' + index + '.title'"
        :rules="{required: true, message: 'Kategori adı boş olamaz.', trigger: 'blur'}">
        <Row>
          <Col span="14">
            <Input type="text" v-model="item.title" placeholder="Kategori ismini giriniz..."></Input>
            <Input class="mt-1" v-model="item.description" type="textarea"
                   placeholder="Kategori açıklaması yazınız..."></Input>
          </Col>
          <Col span="2" class="text-center mx-4">Sıra Numarası</Col>
          <Col span="4" class="mr-2">
            <div>
              <Input type="number" v-model="item.index"></Input>
              <Input type="number" class="hidden" v-model="item.subCategoryId"></Input>
            </div>
          </Col>
          <Col span="1">
            <Button @click="handleRemove(index)" type="error">Sil</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Row>
          <Col span="24">
            <Button type="dashed" long @click="handleAdd" icon="md-add">Yeni Kategori Ekle</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formDynamic')">{{ type === 'update' ? $t('update') : $t('complete')}}</Button>
        <Button v-if="type==='create'" @click="handleReset()" style="margin-left: 8px">Temizle</Button>
      </FormItem>
    </Form>
  </div>

</template>
<script>
import {mapActions} from "vuex";
import {EDUCATION_SUB_CATEGORY_CREATE, EDUCATION_SUB_CATEGORY_DELETE} from "@/store/constants";

export default {
  props: {
    type: {
      type: String
    },
    uploadDetail: {
      type: Object
    }
  },
  data() {
    return {
      index: 1,
      content: '',
      formDynamic: {
        items: [
          {
            title: '',
            description: '',
            index: 1,
            status: 1,
            subCategoryId: null
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions('educations', {
      subCategoryAction: EDUCATION_SUB_CATEGORY_CREATE,
      subCategoryDelete: EDUCATION_SUB_CATEGORY_DELETE,
    }),
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.subCategoryAction({
            educationId: this.uploadDetail.data.attachmentId,
            items: this.formDynamic.items
          })
          if (this.type === 'create') {
            this.$router.push('/education')
          }
        } else {
          this.$Message.error(this.$t('form.error'));
        }
      })
    },
    handleReset() {
      this.formDynamic.items = [
        {
          title: '',
          description: '',
          index: 1,
          status: 1,
          subCategoryId: null
        }
      ]
    },
    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        title: '',
        index: this.index,
        status: 1
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
      if (this.type === 'update') {
        this.subCategoryDelete({
          subCategoryId: this.formDynamic.items[index].subCategoryId
        })
      }
    }
  },
  created() {
    if (this.type === 'update') {
      this.formDynamic.items = this.uploadDetail.data.items
    }
  }
}
</script>
<style>
textarea.ivu-input {
  font-size: 12px !important;
}
</style>
