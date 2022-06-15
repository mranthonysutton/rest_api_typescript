prismaformat:
	npx prisma format

prismapush:
	npx prisma db push

prismaseed:
	npx prisma db seed

dev:
	nodemon src/index.ts

.PHONY: prismaformat prismapush dev prismaseed
