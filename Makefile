prismaformat:
	npx prisma format

prismapush:
	npx prisma db push

prismaseed:
	npx prisma db seed


.PHONY: prismaformat prismapush prismaseed
