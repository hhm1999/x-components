<template>
  <div :class="$style.main">
    <x-explain placement="top" :class="$style.explain">解释说明placement="top"</x-explain>
    <x-explain placement="top-start" :class="$style.explain">解释说明 placement="top-start"</x-explain>
    <x-explain placement="top-end" :class="$style.explain">解释说明 placement="top-end"</x-explain>
    <x-explain placement="bottom" :class="$style.explain">解释说明 placement="bottom"</x-explain>
    <x-explain placement="bottom-start" :class="$style.explain">解释说明 placement="bottom-start"</x-explain>
    <x-explain placement="bottom-end" :class="$style.explain">解释说明 placement="bottom-end"</x-explain>
    <x-explain placement="left" :class="$style.explain">解释说明 placement="left"</x-explain>
    <x-explain placement="left-start" :class="$style.explain">解释说明 placement="left-start"</x-explain>
    <x-explain placement="left-end" :class="$style.explain">解释说明 placement="left-end"</x-explain>
    <x-explain placement="right" :class="$style.explain">解释说明 placement="right"</x-explain>
    <x-explain placement="right-start" :class="$style.explain">解释说明 placement="right-start"</x-explain>
    <x-explain placement="right-end" :class="$style.explain">解释说明 placement="right-end"</x-explain>
  </div>
</template>
<style module lang="scss">
.main{
  .explain{
    margin: 10px;
  }
}
</style>