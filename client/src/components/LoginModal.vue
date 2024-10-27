<template>
  <v-dialog v-model="show" max-width="400">
    <v-card>
      <v-card-title>Войти</v-card-title>
      <v-card-text>
        <v-text-field v-model="username" label="Введите ваше имя" />
      </v-card-text>
      <v-card-actions>
        <v-btn>Войти</v-btn>
        <v-btn>Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
