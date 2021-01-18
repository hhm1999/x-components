<template>
  <div :class="$style.main">
    <x-radio v-model="value1" :label="444">
      选项1
    </x-radio>
    <br><br>
    <x-radio v-model="value1" :label="555" disabled>
      选项2
    </x-radio>
    <br><br>
    <x-radio-group v-model="value2">
      <x-radio :label="444">
        选项1
      </x-radio>
      <x-radio :label="555">
        选项2
      </x-radio>
    </x-radio-group>
    <br>
    <br>
    <x-radio-group disabled :options="options" v-model="value3"></x-radio-group>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      value3: 444,
      value2: 444,
      value1: 555,
      options: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: false }
      ]
    }
  },
  created () {
  },
  mounted() {
  },
  watch: {
  },
  computed: {
  },
  methods: {
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  padding: 10px;
  width: 300px;
}
</style>
