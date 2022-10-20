import inquirer from "inquirer";
import fs from "fs/promises";
import path from "path";

const CategoriesFile = "./public/api/categories/index.json";
const TypeFilesPath = "./public/api/types/";
const PinFilesPath = "./public/api/pins/";

(async () => {
    const { categories } = JSON.parse(await fs.readFile(CategoriesFile));
    const data = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Title:",
        },
        {
            type: "input",
            name: "icon",
            message: "Icon:",
        },
        {
            type: "input",
            name: "description",
            message: "Description:",
        },
        {
            type: "list",
            name: "category",
            message: "Category:",
            choices: categories.map((c) => c.title),
        },
    ]);
    const categoryId = categories.find((c) => c.title === data.category).id;
    console.log(categoryId);
    const typeFile = path.join(TypeFilesPath, `${categoryId}.json`);
    const existingTypes = JSON.parse(await fs.readFile(typeFile)).types;
    const index = existingTypes.length;
    data.id = `${categoryId}_type_${index}`;
    delete data.category;

    // Save data
    fs.writeFile(
        typeFile,
        JSON.stringify({
            types: [...existingTypes, data],
        })
    );
    fs.writeFile(
        path.join(PinFilesPath, `${categoryId}_type_${index}.json`),
        JSON.stringify({
            pins: [],
        })
    );
})();
