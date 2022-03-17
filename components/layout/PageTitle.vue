<template>
  <Content class="private-content-area">
    <Row>
      <!-- Left -->
      <Col span="6">
        <h4 class="font-medium text-base">
          {{ title }}
        </h4>
      </Col>

      <!-- Right -->
      <Col span="18">
        <div class="pri-right-area flex justify-end">
          <!-- Search -->
          <Input search enter-button
                 v-if="search.status"
                 :placeholder="search.placeholder"
                 @on-search="$emit('searchAction', $event)"
                 @on-click="handleClick"
                 style="width: 250px"
          />

          <!-- Button -->
          <Button v-if="button.status" class="pri-action-button ml-1" @click="$emit('buttonAction')" :type="button.type">
            <Icon size="16" type="md-add-circle"/>
            {{ button.title }}
          </Button>
        </div>
      </Col>

    </Row>
  </Content>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    button: {
      type: Object,
      default: () => {
        return {
          status: false
        }
      }
    },
    search: {
      type: Object,
      default: () => {
        return {
          status: false
        }
      }
    }
  },
  data() {
    return {
      value1: '',
      data1: [],
      metaTitle: false
    }
  },
  methods: {
    handleSelect (value) {
      console.log('select value', value)
    },
    handleClick() {
      console.log('handle click')
    }
  }
}
</script>

<style scoped>

</style>
