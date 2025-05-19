import pandas as pd

# Read the emp.CV file into a DataFrame
file_path = 'emp.CV'  # Ensure the file path is correct and the file is in the expected format
try:
    df = pd.read_csv(file_path)  # Use pd.read_excel() if the file is an Excel file
    print("DataFrame successfully created from emp.CV\n")

    # Display the first few rows of the DataFrame
    print("Head of the DataFrame:")
    print(df.head())

    # Display a summary of the DataFrame
    print("\nSummary of the DataFrame:")
    print(df.describe(include='all'))  # Include='all' provides both numerical and categorical summaries
except FileNotFoundError:
    print(f"The file '{file_path}' does not exist.")
except Exception as e:
    print(f"An error occurred: {e}")
