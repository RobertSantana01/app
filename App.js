import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [view, setView] = useState("lista");
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        // Futuramente pode usar AsyncStorage aqui
        const storedRecipes = null; // exemplo: await AsyncStorage.getItem("recipes");
        if (storedRecipes !== null) {
          setRecipes(JSON.parse(storedRecipes));
        }
      } catch (e) {
        console.error("Falha ao carregar receitas.", e);
      }
    };
    loadRecipes();
  }, []);

  const handleAddRecipe = () => {
    if (!title) return;

    const newRecipe = {
      id: Date.now().toString(),
      title: title,
      ingredients: ingredients,
    };

    setRecipes((currentRecipes) => [...currentRecipes, newRecipe]);
    setTitle("");
    setIngredients("");
    setView("lista");
  };

  const handleDeleteRecipe = (id) => {
    setRecipes((currentRecipes) =>
      currentRecipes.filter((recipe) => recipe.id !== id)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Meu Livro de Receitas</Text>

        {view === "lista" ? (
          <View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setView("formulario")}
            >
              <Text style={styles.buttonText}>Adicionar Nova Receita</Text>
            </TouchableOpacity>

            {recipes.length === 0 ? (
              <Text style={styles.emptyText}>Nenhuma receita cadastrada.</Text>
            ) : (
              recipes.map((item) => (
                <View key={item.id} style={styles.recipeItem}>
                  <View style={styles.recipeTextContainer}>
                    <Text style={styles.recipeTitle}>{item.title}</Text>
                    <Text style={styles.recipeIngredients}>
                      {item.ingredients}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteRecipe(item.id)}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.formHeader}>Adicionar Receita</Text>

            <TextInput
              style={styles.input}
              placeholder="Título da Receita"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ingredientes"
              value={ingredients}
              onChangeText={setIngredients}
              multiline
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddRecipe}
            >
              <Text style={styles.buttonText}>Salvar Receita</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setView("lista")}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
  recipeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  recipeTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipeIngredients: {
    fontSize: 14,
    color: "#555",
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 8,
    borderRadius: 6,
  },
  formContainer: {
    marginTop: 20,
  },
  formHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});
