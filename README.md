# SeTime
"Basicamente uma API para marcar horários de qualquer serviço, é com feito com NODE.JS, usando MySql como BD"

SOMENTE A API (somente funções necessarias, sujeito a alterações futuras)

Esse Projetinho foi feito usando como base o nlw 6 da rocketseat, 
porem com objetivos diferentes.

basicamente é um projeto onde os usuarios podem marcar horarios,
exemplo: eu tenho um salão de beleza o cliente marca um horario dizendo oq vai fazer e todas as informações necessaria,
e eu tenho uma lista de todos os cliente que ja estão marcados e todos q eu ja conclui, evitando fila dentro do salão.

porém ainda falta algumas funções como uma função que não permita marcar no mesmo horario, exemplo para cada horario marcado ter um tempo de 
intervalo de 30 min para cada cliente

ANOTAÇÕES DAS BIBLIOTECAS USADAS:

yarn add typeorm reflect-metadata nome do banco = para instalar o bd no projeto
yarn typeorm migration:create -n nomedamigration = para criar migration
yarn add express-async-errors biblioteca capaz de lidar com erros assincronos 
reverter e executar migration
yarn typeorm migration:revert
yarn typeorm migration:run

criar entidade
yarn typeorm entity:create -n nomedaentity

biblioteca para criptografar as senhas
yarn add bcryptjs
yarn add @types/bcryptjs -D
